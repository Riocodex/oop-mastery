//book class containing {author , title, isbn}
class Book{
    constructor(author,title,isbn){
        this.author=author;
        this.title=title;
        this.isbn=isbn;
    }
}
//to do
//localstorage..to store the data in the booklist even after reloaded
class Store{
    static getBooks(){
        let books;
        if(localStorage.getItem('books') === null){//if theres nothing in there
            books=[];
        }else{
            books=JSON.parse(localStorage.getItem('books'));//thsi loads the book data from the local storage after reloading browser 
        }
        return books;
    }
    static addBook(book){//adding books to the local storage
        const books =  Store.getBooks();
        books.push(book);//this will be returning objects and data which wont be readable
        localStorage.setItem('books', JSON.stringify(books));//so json.stringify is used
    }
    static removeBook(isbn){
        const books=Store.getBooks();

        books.forEach((book,index)=>{
            if(book.isbn === isbn){
                books.splice(index,1);
            }
        });
        localStorage.setItem('books',JSON.stringify(books));
    }
}

//ui operations
class UI{
    static displayBooks(){
        const books=Store.getBooks()//this gets any book from the local storage if any are present
        books.forEach((book)=> UI.addBookToList(book));//this for each loops adds every item in the array to the static method 
    }
    static addBookToList(book) {
        const list = document.getElementById('book-list');
        const row = document.createElement('tr');
        row.innerHTML= `

        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td>
        <a href='#' class="btn btn-danger btn-sm delete">X</a>
        </td>

        `//these back ticks allows us to write multiple lines of html

        list.appendChild(row);
    }
    
    static clearFields(){
        document.querySelector('#title').value="";
        document.querySelector('#author').value="";
        document.querySelector('#isbn').value="";

    }
    static showAlert(message, className){
        const div = document.createElement('div');
        div.className=`alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container=document.querySelector('.container')
        const form=document.querySelector('#book-form');
        container.insertBefore(div,form)//this will insert the div right before the form in the comtainer...cool rii😎🔥🔥

        //vanishing the messsage / alert after a second
        setTimeout(()=>{
            document.querySelector('.alert').remove();
        },1000)

    }
    static deleteBook(el){
         if(el.classList.contains("delete")){//this is a statement saying if the delete is a class in the selected item
             el.parentElement.parentElement.remove();//it will delete the parent element which is the row

            
         }
    }
}
//display a book
document.addEventListener('DOMContentLoaded',UI.displayBooks)//the domcontentloaded fires when the html has been loaded completely without waiting for images or stylesheets to finish

//remove a book
document.querySelector('#book-list').addEventListener('click',(e)=>{
    // console.log(e.target)//this console.logs the particular html elment i clicked into the console
    UI.deleteBook(e.target);
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent)//this will return the isbn text.. 
    UI.showAlert('Book succesfully deleted','success');
    
})

//adding a book
document.addEventListener('submit', (e)=>{
    e.preventDefault()//this prevents submission of the form//this method actually cancels any default action eg:if you want to click a link to go to a url it can be cancelled with this method..it can also apply to submit and etc
    //getting form values below
    const title=document.querySelector('#title').value;
    const author=document.querySelector('#author').value;
    const isbn=document.querySelector('#isbn').value;
    
    //validating the form...if the values of the form are empty
    if(title === "" || author === "" || isbn ===""){
        UI.showAlert("Please Enter All Fields","danger");
    }
    else{
        const book = new Book(title,author,isbn)
        UI.addBookToList(book);//adds books to list as the name implies
        Store.addBook(book)//this takes the book added and takes it to the local storage
        UI.clearFields();//clears text fields after submitting
        UI.showAlert("Book Added","success");  
    }
})





