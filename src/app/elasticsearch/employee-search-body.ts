// Define the type of the body for the Search request
export interface EmployeeSearchBody {
    query: {
        match_phrase_prefix: {
            name: string
        }
    }
}
