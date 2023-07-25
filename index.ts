/*
La Arquitectura Hexagonal, también conocida como Puertos y Adaptadores, es un patrón de diseño de software propuesto por Alistair Cockburn. En esta arquitectura, el objetivo principal es la separación de las preocupaciones, donde el dominio de la aplicación y la lógica de negocio se mantienen aislados de los detalles técnicos.

La arquitectura se visualiza como un hexágono, donde cada lado representa un puerto. Hay puertos de entrada, donde la lógica de la aplicación recibe datos (como solicitudes de usuario o señales de un sistema externo), y puertos de salida, donde envía datos a otros sistemas o a la interfaz de usuario.

Los adaptadores, por otro lado, son los detalles técnicos que interactúan con estos puertos. Podrían ser adaptadores para bases de datos, interfaces de usuario, o incluso sistemas externos. Los adaptadores 'adaptan' las interacciones entre el sistema y el mundo exterior, de ahí su nombre.

Para simplificar, vamos a considerar un ejemplo de aplicación de una tienda de libros usando TypeScript.
*/

// Dominio de la aplicación
/** 
Las clases Book y Purchase representan las entidades de dominio en la aplicación. 
- Book tiene propiedades como id, title, author y price. 
- Purchase representa una compra de un libro y tiene una propiedad book y quantity. También tiene un método total que calcula el precio total de la compra.
*/
class Book {
    constructor(
        public id: string,
        public title: string,
        public author: string,
        public price: number,
    ) {}
}

class Purchase {
    constructor(
        public book: Book,
        public quantity: number,
    ) {}

    public total(): number {
        return this.book.price * this.quantity;
    }
}

// Puertos
/** 
Los puertos son interfaces que definen cómo la aplicación puede interactuar con el mundo exterior. 
- BookStoreInputPort es un puerto de entrada que define un método purchase que toma un bookId y una quantity y devuelve una promesa de una Purchase. 
- BookStoreOutputPort es un puerto de salida que define un método savePurchase que toma una Purchase y devuelve una promesa vacía.
*/
interface BookStoreInputPort {
    purchase(bookId: string, quantity: number): Promise<Purchase>;
}

interface BookStoreOutputPort {
    savePurchase(purchase: Purchase): Promise<void>;
}

// Lógica de la aplicación
/** 
BookStoreService implementa la lógica de la aplicación. 
Implementa el puerto de entrada BookStoreInputPort.
En su método purchase, busca un libro por su ID, crea una nueva Purchase, guarda la compra y luego devuelve la compra. 
*/
class BookStoreService implements BookStoreInputPort {
    constructor(private bookStore: BookStoreOutputPort) {}

    async purchase(bookId: string, quantity: number): Promise<Purchase> {
        const book = await this.bookStore.findBookById(bookId);
        const purchase = new Purchase(book, quantity);

        await this.bookStore.savePurchase(purchase);
        return purchase;
    }
}

// Adaptadores
/** 
BookStoreDatabaseAdapter es un adaptador que implementa el puerto de salida BookStoreOutputPort. 
En su método findBookById, busca un registro de libro en la base de datos por su ID y devuelve un nuevo Book. 
En su método savePurchase, guarda un registro de compra en la base de datos.
*/
class BookStoreDatabaseAdapter implements BookStoreOutputPort {
    constructor(private database: Database) {}

    async findBookById(bookId: string): Promise<Book> {
        const dbRecord = await this.database.findRecord('books', bookId);
        return new Book(dbRecord.id, dbRecord.title, dbRecord.author, dbRecord.price);
    }

    async savePurchase(purchase: Purchase): Promise<void> {
        await this.database.saveRecord('purchases', purchase);
    }
}

/*
El beneficio principal de esta arquitectura es que permite cambiar los detalles técnicos (como la base de datos o la interfaz de usuario) sin afectar la lógica de negocio de la aplicación. Esto puede ser especialmente útil en aplicaciones grandes y complejas donde los cambios son frecuentes.
*/


// EJEMPLO DE USO:
// Implementación ficticia de la base de datos
class MockDatabase {
    async findRecord(collection: string, id: string) {
        console.log(`Buscando el libro con id ${id} en la colección ${collection}`);
        return { id: '1', title: 'Libro de prueba', author: 'Autor de prueba', price: 10 };
    }

    async saveRecord(collection: string, record: any) {
        console.log(`Guardando en la colección ${collection}:`, record);
    }
}

// Crear una nueva instancia de la base de datos ficticia
const database = new MockDatabase();

// Crear una nueva instancia del adaptador de la base de datos
const bookStoreDatabaseAdapter = new BookStoreDatabaseAdapter(database);

// Crear una nueva instancia del servicio de la tienda de libros
const bookStoreService = new BookStoreService(bookStoreDatabaseAdapter);

// Realizar una compra
bookStoreService.purchase('1', 2).then(purchase => {
    console.log(`Compra realizada:`, purchase);
    console.log(`Total de la compra:`, purchase.total());
});
