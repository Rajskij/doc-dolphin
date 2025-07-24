function MainContent({ user, children, insetRef, navHeight }) {
    return (
        <>
            <main className="p-4">
                {children}
            </main>
        </>
    );
}

export default MainContent;