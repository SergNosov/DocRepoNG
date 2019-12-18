import {RepoCategory} from "../model/RepoCategory";

export class TestData {
    static repoCategory: RepoCategory[] = [
        new RepoCategory(2, "Документы", "/documentsRest"),
        new RepoCategory(4, "Субъекты", "/sendersRest"),
        new RepoCategory(6, "Типы документов", "/doctypesRest"),
    ];
}

