function MainContent({ children }) {
    return (
        <main className="p-4 bg-background rounded-xl">
            {children}
        </main>
    );
}

export default MainContent;