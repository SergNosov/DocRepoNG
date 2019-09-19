import {Category} from '../model/Category';
import {Priority} from '../model/Priority';
import {Task} from '../model/Task';
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
    new Document(111, '123', new Date('2019-04-10'), 'документ о чем-то там', TestData.doctypes[0],[TestData.senders[4]], 'анонимка'),
    new Document(2, '265-р', new Date('2017-04-10'), 'распоряжение о приеме в собственность', TestData.doctypes[2],[TestData.senders[0]], 'принять  в собственность перечень объектов'),
    new Document(3, '676562-рп/65', new Date('2018-04-10'), 'разрешить вопрос', TestData.doctypes[1],[TestData.senders[2]], 'анонимка'),
    new Document(4, '764', new Date('2019-05-17'), 'запрос документов', TestData.doctypes[4],[TestData.senders[4]], 'перечень'),
    new Document(5, '3', new Date('2013-04-10'), 'никто читать не будет', TestData.doctypes[7],[TestData.senders[6], TestData.senders[4]], 'очень много страниц'),
    new Document(6, 'вз 654', new Date('2012-04-10'), 'очередной шлак', TestData.doctypes[5],[TestData.senders[5]], 'передача куда-нибудь чего-нибудь'),
    new Document(7, 'ФЗ-152', new Date('2016-04-10'), 'решение думы городского округа', TestData.doctypes[6],[TestData.senders[3]], 'решить'),
    new Document(8, '986', new Date('2018-04-10'), 'документ о чем-то там', TestData.doctypes[9],[TestData.senders[1]], 'анонимка'),
    new Document(9, 'ур76', new Date('2011-04-10'), 'документ о чем-то там', TestData.doctypes[3],[TestData.senders[7]], 'анонимка'),
    new Document(10, 'Дело 34', new Date('2009-04-10'), 'документ о чем-то там', TestData.doctypes[8],[TestData.senders[9]], 'анонимка'),
  ];

    static repoCategory: RepoCategory[] = [
        new RepoCategory(1,"Документы","/documents"),
        new RepoCategory(2,"Субъекты","/senders"),
        new RepoCategory(3,"Типы документов","/doctypes"),
    ];

  static categories: Category[] = [
    {id: 1, title: 'Работа'},
    {id: 2, title: 'Семья'},
    {id: 3, title: 'Учеба'},
    {id: 4, title: 'Отдых'},
    {id: 5, title: 'Спорт'},
    {id: 6, title: 'Еда'},
    {id: 7, title: 'Финансы'},
    {id: 8, title: 'Гаджеты'},
    {id: 9, title: 'Здоровье'},
    {id: 10, title: 'Автомобиль'},
    {id: 11, title: 'Ремонт'},
  ];


  static priorities: Priority[] = [
    {id: 1, title: 'Низкий', color: '#e5e5e5'},
    {id: 2, title: 'Средний', color: '#85D1B2'},
    {id: 3, title: 'Высокий', color: '#F1828D'},
    {id: 4, title: 'Очень срочно!!', color: '#F1128D'}
  ];


  // не забывать - индексация приоритетов и категорий начинается с нуля
  static tasks: Task[] = [
    {
      id: 1,
      title: 'Залить бензин полный бак',
      priority: TestData.priorities[2],
      completed: false,
      category: TestData.categories[9],
      date: new Date('2019-04-10')
    },

    {
      id: 2,
      title: 'Передать отчеты начальнику управления',
      priority: TestData.priorities[0],
      completed: false,
      category: TestData.categories[0],
      date: new Date('2019-04-11')
    },

    {
      id: 3,
      title: 'Убраться у себя в комнате, полить растения',
      priority: TestData.priorities[2],
      completed: true,
      category: TestData.categories[1]
    },

    {
      id: 4,
      title: 'Сходить в парк с семьей, пригласить друзей',
      priority: TestData.priorities[1],
      completed: false,
      category: TestData.categories[1],
      date: new Date('2019-08-17')
    },
    {
      id: 5,
      title: 'Найти и выучить учебник по квантовой физике',
      completed: false,
      category: TestData.categories[2]
    },
    {
      id: 6,
      title: 'Сходить на семинар по программированию',
      priority: TestData.priorities[1],
      completed: true,
      category: TestData.categories[2],
      date: new Date('2019-06-11')
    },

    {
      id: 7,
      title: 'Найти билеты в Турцию, выбрать отель',
      priority: TestData.priorities[2],
      completed: false,
      category: TestData.categories[3]
    },
    {
      id: 8,
      title: 'Приготовить ужин для всей семьи (семга с картошкой)',
      completed: false,
      category: TestData.categories[5]
    },
    {
      id: 9,
      title: 'Подтянуться 10 раз',
      priority: TestData.priorities[2],
      completed: false,
      category: TestData.categories[4],
      date: new Date('2019-03-12')
    },
    {
      id: 10,
      title: 'Пробежать 100 м',
      priority: TestData.priorities[0],
      completed: true,
      category: TestData.categories[4]
    },

    {
      id: 11,
      title: 'Организовать детский праздник ',
      completed: false
    },

    {
      id: 12,
      title: 'Сходить на лекцию "Как научиться программировать на Java"',
      priority: TestData.priorities[1],
      completed: false,
      category: TestData.categories[2]
    },
    {
      id: 13,
      title: 'Купить продукты на неделю',
      priority: TestData.priorities[2],
      completed: false,
      category: TestData.categories[5],
      date: new Date('2019-05-11')
    },

    {
      id: 14,
      title: 'Провести собрание по поводу всех проектов',
      completed: true,
      category: TestData.categories[0]
    },

    {
      id: 15,
      title: 'Сдать экзамен по Java',
      priority: TestData.priorities[2],
      completed: true
    },


    {
      id: 16,
      title: 'Положить 100 000 р в банк на депозит',
      priority: TestData.priorities[3],
      completed: false,
      category: TestData.categories[6]
    },

    {
      id: 17,
      title: 'Попросить аванс на работе',
      priority: TestData.priorities[2],
      completed: false,
      category: TestData.categories[6]
    },

    {
      id: 18,
      title: 'Сдать анализы, проверить гемоглобин',
      priority: TestData.priorities[3],
      completed: false,
      category: TestData.categories[8],
      date: new Date('2020-12-11')

    },

    {
      id: 19,
      title: 'Сравнить новый айпад с самсунгом',
      priority: TestData.priorities[0],
      completed: false,
      category: TestData.categories[7],
      date: new Date('2019-10-11')

    },

    {
      id: 20,
      title: 'Футбол с сотрудниками',
      priority: TestData.priorities[0],
      completed: false,
      category: TestData.categories[4],
      date: new Date('2019-03-17')

    }

  ];

}

