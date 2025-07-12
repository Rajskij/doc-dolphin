function MainContent({ children }) {
    return (
        <main className="p-4 bg-white overflow-y-auto">
            <div className="space-y-4">
                {children}
            </div>
        </main>
    );
}

export default MainContent;