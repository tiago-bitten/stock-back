class AuthRepository {
    private invalidTokens: Set<string> = new Set();

    public invalidateToken = (token: string) => {
        this.invalidTokens.add(token);
    }

    public isTokenInvalid = (token: string) => {
        return this.invalidTokens.has(token);
    }
}

export default new AuthRepository;