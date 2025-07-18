function MainContent({ children, insetRef, navHeight }) {
    return (
        <>
            {/* This div below to maintain rounded corners while scrolling */}
            <div className={`fixed py-6.5 bg-sidebar z-9 -m-2`}
                style={
                    {
                        top: `${navHeight}px`,
                        width: insetRef.current?.offsetWidth || 'auto'
                    }
                } />
            <main className="p-4 rounded-xl">
                {children}
            </main>
        </>
    );
}

export default MainContent;