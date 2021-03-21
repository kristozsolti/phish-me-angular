export interface SearchResult {
    searchTerm: string;
    type: string; // employee or phishing mail template
    result: Array<any>;
}
