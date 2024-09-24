const RootLayout = async ({ children }: { children: React.ReactNode }) => {
    return (
      <main className="flex h-[80vh] items-center justify-center">
        {children}
      </main>
    );
  };
  export default RootLayout;