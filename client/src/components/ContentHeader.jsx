function ContentHeader({ navHeight }) {
    console.log(navHeight)
    return (
            <div
                className='flex sticky border-b border-gray-300 bg-gray-100 py-3'
                style={{
                    top: `${navHeight}px`
                }}
            >
                <h2 className="text-2xl font-bold px-5">Main Content</h2>
            </div>
    );
}

export default ContentHeader;
