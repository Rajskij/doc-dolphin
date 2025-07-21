function MainContent({ user, children, insetRef, navHeight }) {
    return (
        <>
            {/* This div below to maintain rounded corners while scrolling */}
            {user && <div className={`fixed py-5.5 bg-sidebar scale-[1.02] z-9`}
                style={
                    {
                        top: `${navHeight}px`,
                        width: insetRef.current?.offsetWidth || 'auto'
                    }
                } />}
            <main className="p-4">
                {children}
            </main>
        </>
    );
}

export default MainContent;