export type DropdownType = {
  fontValue: string
  fontName: string
}[]

export type Meaning = {
  partOfSpeech: string
  definitions: {
    definition: string
    synonyms: string[]
    antonyms: string[]
    example: string
  }[]
  synonyms: string[]
}

export type DefinitionBoxProps = {
  partOfSpeech: string
  definitions: {
    definition: string
    synonyms: string[]
    antonyms: string[]
    example: string
  }[]
  synonyms: string[]
}
