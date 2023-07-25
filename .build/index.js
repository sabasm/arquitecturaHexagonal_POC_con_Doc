"use strict";

// index.ts
var Book = class {
  constructor(id, title, author, price) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.price = price;
  }
};
var Purchase = class {
  constructor(book, quantity) {
    this.book = book;
    this.quantity = quantity;
  }
  total() {
    return this.book.price * this.quantity;
  }
};
var BookStoreService = class {
  constructor(bookStore) {
    this.bookStore = bookStore;
  }
  async purchase(bookId, quantity) {
    const book = await this.bookStore.findBookById(bookId);
    const purchase = new Purchase(book, quantity);
    await this.bookStore.savePurchase(purchase);
    return purchase;
  }
};
var BookStoreDatabaseAdapter = class {
  constructor(database2) {
    this.database = database2;
  }
  async findBookById(bookId) {
    const dbRecord = await this.database.findRecord("books", bookId);
    return new Book(dbRecord.id, dbRecord.title, dbRecord.author, dbRecord.price);
  }
  async savePurchase(purchase) {
    await this.database.saveRecord("purchases", purchase);
  }
};
var MockDatabase = class {
  async findRecord(collection, id) {
    console.log(`Buscando el libro con id ${id} en la colecci\xF3n ${collection}`);
    return { id: "1", title: "Libro de prueba", author: "Autor de prueba", price: 10 };
  }
  async saveRecord(collection, record) {
    console.log(`Guardando en la colecci\xF3n ${collection}:`, record);
  }
};
var database = new MockDatabase();
var bookStoreDatabaseAdapter = new BookStoreDatabaseAdapter(database);
var bookStoreService = new BookStoreService(bookStoreDatabaseAdapter);
bookStoreService.purchase("1", 2).then((purchase) => {
  console.log(`Compra realizada:`, purchase);
  console.log(`Total de la compra:`, purchase.total());
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vaW5kZXgudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8qXG5MYSBBcnF1aXRlY3R1cmEgSGV4YWdvbmFsLCB0YW1iaVx1MDBFOW4gY29ub2NpZGEgY29tbyBQdWVydG9zIHkgQWRhcHRhZG9yZXMsIGVzIHVuIHBhdHJcdTAwRjNuIGRlIGRpc2VcdTAwRjFvIGRlIHNvZnR3YXJlIHByb3B1ZXN0byBwb3IgQWxpc3RhaXIgQ29ja2J1cm4uIEVuIGVzdGEgYXJxdWl0ZWN0dXJhLCBlbCBvYmpldGl2byBwcmluY2lwYWwgZXMgbGEgc2VwYXJhY2lcdTAwRjNuIGRlIGxhcyBwcmVvY3VwYWNpb25lcywgZG9uZGUgZWwgZG9taW5pbyBkZSBsYSBhcGxpY2FjaVx1MDBGM24geSBsYSBsXHUwMEYzZ2ljYSBkZSBuZWdvY2lvIHNlIG1hbnRpZW5lbiBhaXNsYWRvcyBkZSBsb3MgZGV0YWxsZXMgdFx1MDBFOWNuaWNvcy5cblxuTGEgYXJxdWl0ZWN0dXJhIHNlIHZpc3VhbGl6YSBjb21vIHVuIGhleFx1MDBFMWdvbm8sIGRvbmRlIGNhZGEgbGFkbyByZXByZXNlbnRhIHVuIHB1ZXJ0by4gSGF5IHB1ZXJ0b3MgZGUgZW50cmFkYSwgZG9uZGUgbGEgbFx1MDBGM2dpY2EgZGUgbGEgYXBsaWNhY2lcdTAwRjNuIHJlY2liZSBkYXRvcyAoY29tbyBzb2xpY2l0dWRlcyBkZSB1c3VhcmlvIG8gc2VcdTAwRjFhbGVzIGRlIHVuIHNpc3RlbWEgZXh0ZXJubyksIHkgcHVlcnRvcyBkZSBzYWxpZGEsIGRvbmRlIGVudlx1MDBFRGEgZGF0b3MgYSBvdHJvcyBzaXN0ZW1hcyBvIGEgbGEgaW50ZXJmYXogZGUgdXN1YXJpby5cblxuTG9zIGFkYXB0YWRvcmVzLCBwb3Igb3RybyBsYWRvLCBzb24gbG9zIGRldGFsbGVzIHRcdTAwRTljbmljb3MgcXVlIGludGVyYWN0XHUwMEZBYW4gY29uIGVzdG9zIHB1ZXJ0b3MuIFBvZHJcdTAwRURhbiBzZXIgYWRhcHRhZG9yZXMgcGFyYSBiYXNlcyBkZSBkYXRvcywgaW50ZXJmYWNlcyBkZSB1c3VhcmlvLCBvIGluY2x1c28gc2lzdGVtYXMgZXh0ZXJub3MuIExvcyBhZGFwdGFkb3JlcyAnYWRhcHRhbicgbGFzIGludGVyYWNjaW9uZXMgZW50cmUgZWwgc2lzdGVtYSB5IGVsIG11bmRvIGV4dGVyaW9yLCBkZSBhaFx1MDBFRCBzdSBub21icmUuXG5cblBhcmEgc2ltcGxpZmljYXIsIHZhbW9zIGEgY29uc2lkZXJhciB1biBlamVtcGxvIGRlIGFwbGljYWNpXHUwMEYzbiBkZSB1bmEgdGllbmRhIGRlIGxpYnJvcyB1c2FuZG8gVHlwZVNjcmlwdC5cbiovXG5cbi8vIERvbWluaW8gZGUgbGEgYXBsaWNhY2lcdTAwRjNuXG4vKiogXG5MYXMgY2xhc2VzIEJvb2sgeSBQdXJjaGFzZSByZXByZXNlbnRhbiBsYXMgZW50aWRhZGVzIGRlIGRvbWluaW8gZW4gbGEgYXBsaWNhY2lcdTAwRjNuLiBcbi0gQm9vayB0aWVuZSBwcm9waWVkYWRlcyBjb21vIGlkLCB0aXRsZSwgYXV0aG9yIHkgcHJpY2UuIFxuLSBQdXJjaGFzZSByZXByZXNlbnRhIHVuYSBjb21wcmEgZGUgdW4gbGlicm8geSB0aWVuZSB1bmEgcHJvcGllZGFkIGJvb2sgeSBxdWFudGl0eS4gVGFtYmlcdTAwRTluIHRpZW5lIHVuIG1cdTAwRTl0b2RvIHRvdGFsIHF1ZSBjYWxjdWxhIGVsIHByZWNpbyB0b3RhbCBkZSBsYSBjb21wcmEuXG4qL1xuY2xhc3MgQm9vayB7XG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHB1YmxpYyBpZDogc3RyaW5nLFxuICAgICAgICBwdWJsaWMgdGl0bGU6IHN0cmluZyxcbiAgICAgICAgcHVibGljIGF1dGhvcjogc3RyaW5nLFxuICAgICAgICBwdWJsaWMgcHJpY2U6IG51bWJlcixcbiAgICApIHt9XG59XG5cbmNsYXNzIFB1cmNoYXNlIHtcbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHVibGljIGJvb2s6IEJvb2ssXG4gICAgICAgIHB1YmxpYyBxdWFudGl0eTogbnVtYmVyLFxuICAgICkge31cblxuICAgIHB1YmxpYyB0b3RhbCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5ib29rLnByaWNlICogdGhpcy5xdWFudGl0eTtcbiAgICB9XG59XG5cbi8vIFB1ZXJ0b3Ncbi8qKiBcbkxvcyBwdWVydG9zIHNvbiBpbnRlcmZhY2VzIHF1ZSBkZWZpbmVuIGNcdTAwRjNtbyBsYSBhcGxpY2FjaVx1MDBGM24gcHVlZGUgaW50ZXJhY3R1YXIgY29uIGVsIG11bmRvIGV4dGVyaW9yLiBcbi0gQm9va1N0b3JlSW5wdXRQb3J0IGVzIHVuIHB1ZXJ0byBkZSBlbnRyYWRhIHF1ZSBkZWZpbmUgdW4gbVx1MDBFOXRvZG8gcHVyY2hhc2UgcXVlIHRvbWEgdW4gYm9va0lkIHkgdW5hIHF1YW50aXR5IHkgZGV2dWVsdmUgdW5hIHByb21lc2EgZGUgdW5hIFB1cmNoYXNlLiBcbi0gQm9va1N0b3JlT3V0cHV0UG9ydCBlcyB1biBwdWVydG8gZGUgc2FsaWRhIHF1ZSBkZWZpbmUgdW4gbVx1MDBFOXRvZG8gc2F2ZVB1cmNoYXNlIHF1ZSB0b21hIHVuYSBQdXJjaGFzZSB5IGRldnVlbHZlIHVuYSBwcm9tZXNhIHZhY1x1MDBFRGEuXG4qL1xuaW50ZXJmYWNlIEJvb2tTdG9yZUlucHV0UG9ydCB7XG4gICAgcHVyY2hhc2UoYm9va0lkOiBzdHJpbmcsIHF1YW50aXR5OiBudW1iZXIpOiBQcm9taXNlPFB1cmNoYXNlPjtcbn1cblxuaW50ZXJmYWNlIEJvb2tTdG9yZU91dHB1dFBvcnQge1xuICAgIHNhdmVQdXJjaGFzZShwdXJjaGFzZTogUHVyY2hhc2UpOiBQcm9taXNlPHZvaWQ+O1xufVxuXG4vLyBMXHUwMEYzZ2ljYSBkZSBsYSBhcGxpY2FjaVx1MDBGM25cbi8qKiBcbkJvb2tTdG9yZVNlcnZpY2UgaW1wbGVtZW50YSBsYSBsXHUwMEYzZ2ljYSBkZSBsYSBhcGxpY2FjaVx1MDBGM24uIFxuSW1wbGVtZW50YSBlbCBwdWVydG8gZGUgZW50cmFkYSBCb29rU3RvcmVJbnB1dFBvcnQuXG5FbiBzdSBtXHUwMEU5dG9kbyBwdXJjaGFzZSwgYnVzY2EgdW4gbGlicm8gcG9yIHN1IElELCBjcmVhIHVuYSBudWV2YSBQdXJjaGFzZSwgZ3VhcmRhIGxhIGNvbXByYSB5IGx1ZWdvIGRldnVlbHZlIGxhIGNvbXByYS4gXG4qL1xuY2xhc3MgQm9va1N0b3JlU2VydmljZSBpbXBsZW1lbnRzIEJvb2tTdG9yZUlucHV0UG9ydCB7XG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBib29rU3RvcmU6IEJvb2tTdG9yZU91dHB1dFBvcnQpIHt9XG5cbiAgICBhc3luYyBwdXJjaGFzZShib29rSWQ6IHN0cmluZywgcXVhbnRpdHk6IG51bWJlcik6IFByb21pc2U8UHVyY2hhc2U+IHtcbiAgICAgICAgY29uc3QgYm9vayA9IGF3YWl0IHRoaXMuYm9va1N0b3JlLmZpbmRCb29rQnlJZChib29rSWQpO1xuICAgICAgICBjb25zdCBwdXJjaGFzZSA9IG5ldyBQdXJjaGFzZShib29rLCBxdWFudGl0eSk7XG5cbiAgICAgICAgYXdhaXQgdGhpcy5ib29rU3RvcmUuc2F2ZVB1cmNoYXNlKHB1cmNoYXNlKTtcbiAgICAgICAgcmV0dXJuIHB1cmNoYXNlO1xuICAgIH1cbn1cblxuLy8gQWRhcHRhZG9yZXNcbi8qKiBcbkJvb2tTdG9yZURhdGFiYXNlQWRhcHRlciBlcyB1biBhZGFwdGFkb3IgcXVlIGltcGxlbWVudGEgZWwgcHVlcnRvIGRlIHNhbGlkYSBCb29rU3RvcmVPdXRwdXRQb3J0LiBcbkVuIHN1IG1cdTAwRTl0b2RvIGZpbmRCb29rQnlJZCwgYnVzY2EgdW4gcmVnaXN0cm8gZGUgbGlicm8gZW4gbGEgYmFzZSBkZSBkYXRvcyBwb3Igc3UgSUQgeSBkZXZ1ZWx2ZSB1biBudWV2byBCb29rLiBcbkVuIHN1IG1cdTAwRTl0b2RvIHNhdmVQdXJjaGFzZSwgZ3VhcmRhIHVuIHJlZ2lzdHJvIGRlIGNvbXByYSBlbiBsYSBiYXNlIGRlIGRhdG9zLlxuKi9cbmNsYXNzIEJvb2tTdG9yZURhdGFiYXNlQWRhcHRlciBpbXBsZW1lbnRzIEJvb2tTdG9yZU91dHB1dFBvcnQge1xuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZGF0YWJhc2U6IERhdGFiYXNlKSB7fVxuXG4gICAgYXN5bmMgZmluZEJvb2tCeUlkKGJvb2tJZDogc3RyaW5nKTogUHJvbWlzZTxCb29rPiB7XG4gICAgICAgIGNvbnN0IGRiUmVjb3JkID0gYXdhaXQgdGhpcy5kYXRhYmFzZS5maW5kUmVjb3JkKCdib29rcycsIGJvb2tJZCk7XG4gICAgICAgIHJldHVybiBuZXcgQm9vayhkYlJlY29yZC5pZCwgZGJSZWNvcmQudGl0bGUsIGRiUmVjb3JkLmF1dGhvciwgZGJSZWNvcmQucHJpY2UpO1xuICAgIH1cblxuICAgIGFzeW5jIHNhdmVQdXJjaGFzZShwdXJjaGFzZTogUHVyY2hhc2UpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgYXdhaXQgdGhpcy5kYXRhYmFzZS5zYXZlUmVjb3JkKCdwdXJjaGFzZXMnLCBwdXJjaGFzZSk7XG4gICAgfVxufVxuXG4vKlxuRWwgYmVuZWZpY2lvIHByaW5jaXBhbCBkZSBlc3RhIGFycXVpdGVjdHVyYSBlcyBxdWUgcGVybWl0ZSBjYW1iaWFyIGxvcyBkZXRhbGxlcyB0XHUwMEU5Y25pY29zIChjb21vIGxhIGJhc2UgZGUgZGF0b3MgbyBsYSBpbnRlcmZheiBkZSB1c3VhcmlvKSBzaW4gYWZlY3RhciBsYSBsXHUwMEYzZ2ljYSBkZSBuZWdvY2lvIGRlIGxhIGFwbGljYWNpXHUwMEYzbi4gRXN0byBwdWVkZSBzZXIgZXNwZWNpYWxtZW50ZSBcdTAwRkF0aWwgZW4gYXBsaWNhY2lvbmVzIGdyYW5kZXMgeSBjb21wbGVqYXMgZG9uZGUgbG9zIGNhbWJpb3Mgc29uIGZyZWN1ZW50ZXMuXG4qL1xuXG5cbi8vIEVKRU1QTE8gREUgVVNPOlxuLy8gSW1wbGVtZW50YWNpXHUwMEYzbiBmaWN0aWNpYSBkZSBsYSBiYXNlIGRlIGRhdG9zXG5jbGFzcyBNb2NrRGF0YWJhc2Uge1xuICAgIGFzeW5jIGZpbmRSZWNvcmQoY29sbGVjdGlvbjogc3RyaW5nLCBpZDogc3RyaW5nKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGBCdXNjYW5kbyBlbCBsaWJybyBjb24gaWQgJHtpZH0gZW4gbGEgY29sZWNjaVx1MDBGM24gJHtjb2xsZWN0aW9ufWApO1xuICAgICAgICByZXR1cm4geyBpZDogJzEnLCB0aXRsZTogJ0xpYnJvIGRlIHBydWViYScsIGF1dGhvcjogJ0F1dG9yIGRlIHBydWViYScsIHByaWNlOiAxMCB9O1xuICAgIH1cblxuICAgIGFzeW5jIHNhdmVSZWNvcmQoY29sbGVjdGlvbjogc3RyaW5nLCByZWNvcmQ6IGFueSkge1xuICAgICAgICBjb25zb2xlLmxvZyhgR3VhcmRhbmRvIGVuIGxhIGNvbGVjY2lcdTAwRjNuICR7Y29sbGVjdGlvbn06YCwgcmVjb3JkKTtcbiAgICB9XG59XG5cbi8vIENyZWFyIHVuYSBudWV2YSBpbnN0YW5jaWEgZGUgbGEgYmFzZSBkZSBkYXRvcyBmaWN0aWNpYVxuY29uc3QgZGF0YWJhc2UgPSBuZXcgTW9ja0RhdGFiYXNlKCk7XG5cbi8vIENyZWFyIHVuYSBudWV2YSBpbnN0YW5jaWEgZGVsIGFkYXB0YWRvciBkZSBsYSBiYXNlIGRlIGRhdG9zXG5jb25zdCBib29rU3RvcmVEYXRhYmFzZUFkYXB0ZXIgPSBuZXcgQm9va1N0b3JlRGF0YWJhc2VBZGFwdGVyKGRhdGFiYXNlKTtcblxuLy8gQ3JlYXIgdW5hIG51ZXZhIGluc3RhbmNpYSBkZWwgc2VydmljaW8gZGUgbGEgdGllbmRhIGRlIGxpYnJvc1xuY29uc3QgYm9va1N0b3JlU2VydmljZSA9IG5ldyBCb29rU3RvcmVTZXJ2aWNlKGJvb2tTdG9yZURhdGFiYXNlQWRhcHRlcik7XG5cbi8vIFJlYWxpemFyIHVuYSBjb21wcmFcbmJvb2tTdG9yZVNlcnZpY2UucHVyY2hhc2UoJzEnLCAyKS50aGVuKHB1cmNoYXNlID0+IHtcbiAgICBjb25zb2xlLmxvZyhgQ29tcHJhIHJlYWxpemFkYTpgLCBwdXJjaGFzZSk7XG4gICAgY29uc29sZS5sb2coYFRvdGFsIGRlIGxhIGNvbXByYTpgLCBwdXJjaGFzZS50b3RhbCgpKTtcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7O0FBZ0JBLElBQU0sT0FBTixNQUFXO0FBQUEsRUFDUCxZQUNXLElBQ0EsT0FDQSxRQUNBLE9BQ1Q7QUFKUztBQUNBO0FBQ0E7QUFDQTtBQUFBLEVBQ1I7QUFDUDtBQUVBLElBQU0sV0FBTixNQUFlO0FBQUEsRUFDWCxZQUNXLE1BQ0EsVUFDVDtBQUZTO0FBQ0E7QUFBQSxFQUNSO0FBQUEsRUFFSSxRQUFnQjtBQUNuQixXQUFPLEtBQUssS0FBSyxRQUFRLEtBQUs7QUFBQSxFQUNsQztBQUNKO0FBc0JBLElBQU0sbUJBQU4sTUFBcUQ7QUFBQSxFQUNqRCxZQUFvQixXQUFnQztBQUFoQztBQUFBLEVBQWlDO0FBQUEsRUFFckQsTUFBTSxTQUFTLFFBQWdCLFVBQXFDO0FBQ2hFLFVBQU0sT0FBTyxNQUFNLEtBQUssVUFBVSxhQUFhLE1BQU07QUFDckQsVUFBTSxXQUFXLElBQUksU0FBUyxNQUFNLFFBQVE7QUFFNUMsVUFBTSxLQUFLLFVBQVUsYUFBYSxRQUFRO0FBQzFDLFdBQU87QUFBQSxFQUNYO0FBQ0o7QUFRQSxJQUFNLDJCQUFOLE1BQThEO0FBQUEsRUFDMUQsWUFBb0JBLFdBQW9CO0FBQXBCLG9CQUFBQTtBQUFBLEVBQXFCO0FBQUEsRUFFekMsTUFBTSxhQUFhLFFBQStCO0FBQzlDLFVBQU0sV0FBVyxNQUFNLEtBQUssU0FBUyxXQUFXLFNBQVMsTUFBTTtBQUMvRCxXQUFPLElBQUksS0FBSyxTQUFTLElBQUksU0FBUyxPQUFPLFNBQVMsUUFBUSxTQUFTLEtBQUs7QUFBQSxFQUNoRjtBQUFBLEVBRUEsTUFBTSxhQUFhLFVBQW1DO0FBQ2xELFVBQU0sS0FBSyxTQUFTLFdBQVcsYUFBYSxRQUFRO0FBQUEsRUFDeEQ7QUFDSjtBQVNBLElBQU0sZUFBTixNQUFtQjtBQUFBLEVBQ2YsTUFBTSxXQUFXLFlBQW9CLElBQVk7QUFDN0MsWUFBUSxJQUFJLDRCQUE0Qix5QkFBc0IsWUFBWTtBQUMxRSxXQUFPLEVBQUUsSUFBSSxLQUFLLE9BQU8sbUJBQW1CLFFBQVEsbUJBQW1CLE9BQU8sR0FBRztBQUFBLEVBQ3JGO0FBQUEsRUFFQSxNQUFNLFdBQVcsWUFBb0IsUUFBYTtBQUM5QyxZQUFRLElBQUksZ0NBQTZCLGVBQWUsTUFBTTtBQUFBLEVBQ2xFO0FBQ0o7QUFHQSxJQUFNLFdBQVcsSUFBSSxhQUFhO0FBR2xDLElBQU0sMkJBQTJCLElBQUkseUJBQXlCLFFBQVE7QUFHdEUsSUFBTSxtQkFBbUIsSUFBSSxpQkFBaUIsd0JBQXdCO0FBR3RFLGlCQUFpQixTQUFTLEtBQUssQ0FBQyxFQUFFLEtBQUssY0FBWTtBQUMvQyxVQUFRLElBQUkscUJBQXFCLFFBQVE7QUFDekMsVUFBUSxJQUFJLHVCQUF1QixTQUFTLE1BQU0sQ0FBQztBQUN2RCxDQUFDOyIsCiAgIm5hbWVzIjogWyJkYXRhYmFzZSJdCn0K
