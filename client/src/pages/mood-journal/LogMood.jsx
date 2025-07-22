import React from "react"
import { useForm } from "react-hook-form"
import { format } from "date-fns"

import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import { Command, CommandGroup, CommandItem } from "@/components/ui/command"
import { CalendarIcon, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"

const moods = ["Happy", "Neutral", "Sad", "Excited", "Tired", "Angry"]
const weatherOptions = ["Sunny", "Cloudy", "Rainy", "Snowy", "Stormy"]
const activityOptions = ["Work", "Study", "Exercise", "Art", "Music", "Reading",
"Writing", "Coding", "Cooking", "Social", "Relaxation", "Travel", "Gaming", "Meditation",
"Shopping", "Gardening", "Photography", "DIY", "Learning", "Netflix", "Outdoors"];

export default function LogMood() {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      mood: "",
      weather: "",
      date: new Date(),
      activities: [],
      notes: "",
    },
  })

  const mood = watch("mood")
  const weather = watch("weather")
  const date = watch("date")
  const activities = watch("activities") || []

  const handleMultiSelectChange = (option) => {
    const updated = activities.includes(option)
      ? activities.filter((item) => item !== option)
      : [...activities, option]
    setValue("activities", updated)
  }

  const onSubmit = (data) => {
    console.log(data)
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 max-w-xl mx-auto p-6 min-h-[calc(100vh-12rem)]"
    >
      {/* Mood selector */}
      <div>
        <label className="block text-sm font-medium mb-1">Mood</label>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full justify-between">
              {mood || "Select mood"}
              <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="p-0">
            <Command>
              <CommandGroup>
                {moods.map((m) => (
                  <CommandItem key={m} onSelect={() => setValue("mood", m)}>
                    {m}
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
        {errors.mood && (
          <span className="text-sm text-red-500">{errors.mood.message}</span>
        )}
      </div>

      {/* Weather selector */}
      <div>
        <label className="block text-sm font-medium mb-1">Weather</label>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full justify-between">
              {weather || "Select weather"}
              <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {weatherOptions.map((w) => (
              <DropdownMenuItem key={w} onSelect={() => setValue("weather", w)}>
                {w}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        {errors.weather && (
          <span className="text-sm text-red-500">{errors.weather.message}</span>
        )}
      </div>

      {/* Date picker */}
      <div>
        <label className="block text-sm font-medium mb-1">Date</label>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full justify-start text-left">
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP") : "Pick a date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={(d) => setValue("date", d)}
              initialFocus
            />
          </PopoverContent>
        </Popover>
        {errors.date && (
          <span className="text-sm text-red-500">{errors.date.message}</span>
        )}
      </div>

      {/* Multi-select activities */}
      <div>
        <label className="block text-sm font-medium mb-1">Activities</label>
        <div className="flex flex-wrap gap-2 border p-2 rounded-md">
          {activityOptions.map((option) => {
            const isSelected = activities.includes(option)
            return (
              <button
                key={option}
                type="button"
                onClick={() => handleMultiSelectChange(option)}
                className={cn(
                  "px-3 py-1 rounded-full border text-sm",
                  isSelected && "bg-primary"
                )}
              >
                {option}
              </button>
            )
          })}
        </div>
        {errors.activities && (
          <span className="text-sm text-red-500">{errors.activities.message}</span>
        )}
      </div>

      {/* Notes textarea */}
      <div>
        <label className="block text-sm font-medium mb-1">Notes</label>
        <Textarea {...register("notes")} placeholder="Write any notes here..." />
      </div>

      {/* Submit button */}
      <Button type="submit">Submit</Button>
    </form>
  )
}
