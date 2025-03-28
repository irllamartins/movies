export type ProductionCompanies = {
    id: number
    logo_path: string
    name: string
    origin_country: string
}
export type Credits ={
    cast: Person[]
    crew: Person[]
}
export type Person ={
    id:number
    known_for_department: string
    name:string
    original_name:string
    profile_path:string
    character?:string
    job?:string
}