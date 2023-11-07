type videoType ={
    id: number
    title:	string
    author:	string
    canBeDownloaded:	boolean
    //By default - false

    minAgeRestriction:	number
    /*maximum: 18
    minimum: 1
    default: null
    nullable: true
    null - no restriction*/

    createdAt: 	string //($date-time)
    publicationDate:	string //($date-time)
    //By default - +1 day from CreatedAt

    availableResolutions: number[]
/*  nullable: true
    h01.Resolutionsstring
    Enum:
        [ P144, P240, P360, P480, P720, P1080, P1440, P2160 ]
    ]
    */
}