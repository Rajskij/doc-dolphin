import { createClient } from '@/lib/supabase/client'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useDropzone } from 'react-dropzone';

const supabase = createClient()

const useSupabaseUpload = (options) => {
  const {
    bucketName,
    path,
    allowedMimeTypes = [],
    maxFileSize = Number.POSITIVE_INFINITY,
    maxFiles = 1,
    cacheControl = 3600,
    upsert = false,
  } = options

  const [files, setFiles] = useState([])
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState([])
  const [successes, setSuccesses] = useState([])

  const isSuccess = useMemo(() => {
    if (errors.length === 0 && successes.length === 0) {
      return false
    }
    if (errors.length === 0 && successes.length === files.length) {
      return true
    }
    return false
  }, [errors.length, successes.length, files.length])

  const onDrop = useCallback((acceptedFiles, fileRejections) => {
    const validFiles = acceptedFiles
      .filter((file) => !files.find((x) => x.name === file.name))
      .map((file) => {
        ;(file).preview = URL.createObjectURL(file)
        ;(file).errors = []
        return file;
      })

    const invalidFiles = fileRejections.map(({ file, errors }) => {
      ;(file).preview = URL.createObjectURL(file)
      ;(file).errors = errors
      return file;
    })

    const newFiles = [...files, ...validFiles, ...invalidFiles]

    setFiles(newFiles)
  }, [files, setFiles])

  const dropzoneProps = useDropzone({
    onDrop,
    noClick: true,
    accept: allowedMimeTypes.reduce((acc, type) => ({ ...acc, [type]: [] }), {}),
    maxSize: maxFileSize,
    maxFiles: maxFiles,
    multiple: maxFiles !== 1,
  })

  const onUpload = useCallback(async () => {
    setLoading(true)

    // [Joshen] This is to support handling partial successes
    // If any files didn't upload for any reason, hitting "Upload" again will only upload the files that had errors
    const filesWithErrors = errors.map((x) => x.name)
    const filesToUpload =
      filesWithErrors.length > 0
        ? [
            ...files.filter((f) => filesWithErrors.includes(f.name)),
            ...files.filter((f) => !successes.includes(f.name)),
          ]
        : files

    const responses = await Promise.all(filesToUpload.map(async (file) => {
      const { error } = await supabase.storage
        .from(bucketName)
        .upload(!!path ? `${path}/${file.name}` : file.name, file, {
          cacheControl: cacheControl.toString(),
          upsert,
        })
      if (error) {
        return { name: file.name, message: error.message }
      } else {
        return { name: file.name, message: undefined }
      }
    }))

    const responseErrors = responses.filter((x) => x.message !== undefined)
    // if there were errors previously, this function tried to upload the files again so we should clear/overwrite the existing errors.
    setErrors(responseErrors)

    const responseSuccesses = responses.filter((x) => x.message === undefined)
    const newSuccesses = Array.from(new Set([...successes, ...responseSuccesses.map((x) => x.name)]))
    setSuccesses(newSuccesses)

    setLoading(false)
  }, [files, path, bucketName, errors, successes])

  useEffect(() => {
    if (files.length === 0) {
      setErrors([])
    }

    // If the number of files doesn't exceed the maxFiles parameter, remove the error 'Too many files' from each file
    if (files.length <= maxFiles) {
      let changed = false
      const newFiles = files.map((file) => {
        if (file.errors.some((e) => e.code === 'too-many-files')) {
          file.errors = file.errors.filter((e) => e.code !== 'too-many-files')
          changed = true
        }
        return file
      })
      if (changed) {
        setFiles(newFiles)
      }
    }
  }, [files.length, setFiles, maxFiles])

  return {
    files,
    setFiles,
    successes,
    isSuccess,
    loading,
    errors,
    setErrors,
    onUpload,
    maxFileSize: maxFileSize,
    maxFiles: maxFiles,
    allowedMimeTypes,
    ...dropzoneProps,
  }
}

export { useSupabaseUpload };
