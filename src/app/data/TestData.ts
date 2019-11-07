import {Doctype} from '../model/Doctype';
import {Sender} from '../model/Sender';
import {Document} from '../model/Document';
import {RepoCategory} from "../model/RepoCategory";

export class TestData {

  static doctypes: Doctype[] = [
    new Doctype(1, 'Заявление'),
    new Doctype(2, 'Распоряжение'),
    new Doctype(3, 'Решение'),
    new Doctype(4, 'Постановление'),
    new Doctype(5, 'Анонимка'),
    new Doctype(6, 'Запрос'),
    new Doctype(7, 'Ответ'),
    new Doctype(8, 'Письмо'),
    new Doctype(9, 'Закон'),
    new Doctype(10, 'Приказ'),
  ];

  static senders: Sender[] = [
    new Sender(11, 'Комитет по управлению имуществом г. Чита' ),
    new Sender(2, 'Дума городского округа г.Чита' ),
    new Sender(3, 'ДГИиЗО' ),
    new Sender(4, 'Аноним' ),
    new Sender(5, 'ИП Булыгин А.С.' ),
    new Sender(6, 'ООО Рога и Копыта' ),
    new Sender(7, 'Прокуратура центрального района' ),
    new Sender(8, 'Суд Центрального района' ),
    new Sender(9, 'Арбитражный суд ЗК' ),
    new Sender(10, 'Федеральный инспектор' ),
  ];

  static documents: Document[] = [
    new Document(111,  new Date('2019-04-10'), 'документ о чем-то там', TestData.doctypes[0],[TestData.senders[4]], '123','анонимка'),
    new Document(112, new Date('2019-04-10'), 'документ о чем-то там', TestData.doctypes[0],[TestData.senders[4]], '','анонимка'),
    new Document(2,  new Date('2017-04-10'), 'распоряжение о приеме в собственность', TestData.doctypes[2],[TestData.senders[0]], '265-р','принять  в собственность перечень объектов'),
    new Document(3,  new Date('2018-04-10'), 'разрешить вопрос', TestData.doctypes[1],[TestData.senders[2]],'676562-рп/65', 'анонимка'),
    new Document(4,  new Date('2019-05-17'), 'запрос документов', TestData.doctypes[4],[TestData.senders[4]], '764','перечень'),
    new Document(5,  new Date('2013-04-10'), 'никто читать не будет', TestData.doctypes[7],[TestData.senders[6], TestData.senders[4]], '3','очень много страниц'),
    new Document(6,  new Date('2012-04-10'), 'очередной шлак', TestData.doctypes[5],[TestData.senders[5]], 'вз 654','передача куда-нибудь чего-нибудь'),
    new Document(7,  new Date('2016-04-10'), 'решение думы городского округа', TestData.doctypes[6],[TestData.senders[3]],'ФЗ-152','решить'),
    new Document(8, new Date('2018-04-10'), 'документ о чем-то там', TestData.doctypes[9],[TestData.senders[1]], '986','анонимка'),
    new Document(9,  new Date('2011-04-10'), 'документ о чем-то там', TestData.doctypes[3],[TestData.senders[7]], 'ур76','анонимка'),
    new Document(10,  new Date('2009-04-10'), 'документ о чем-то там', TestData.doctypes[8],[TestData.senders[9]], 'Дело 34','анонимка'),
  ];

    static repoCategory: RepoCategory[] = [
        new RepoCategory(1,"Документы","/documents"),
        new RepoCategory(2,"Субъекты","/senders"),
        new RepoCategory(2,"Субъекты(Rest)","/sendersRest"),
        new RepoCategory(3,"Типы документов","/doctypes"),
    ];
}

