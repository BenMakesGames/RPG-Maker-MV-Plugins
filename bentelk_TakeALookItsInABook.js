// config:

// if you want the chapter select window (on the left) to be a different width, set it here:
Window_Book_Chapter_Select.WIDTH = 240;

// here's where you define all the books in the game:
Scene_Book.BOOKS = {

    // this is the book id: "sifStoneNotes"
    sifStoneNotes: [
        // chapter 1:
        {
            title: "Strange Yellow Stone",
            body:
                "We thought about burrying it, or throwing it into the ocean, but something about the way the creature talked about it...<br><br>We've decided to keep this stone."
            // I'm using YEP_MessageCore, which adds <br> support. if you're not using YEP_MessageCore,
            // that's fine, though I really recommend it; it supports automatic word-wrapping of all
            // text, which is a godsend, except its sent by Yanfly.
        },

        // chapter 2:
        {
            title: "Mik",
            body:
                "We met an old Tiini named Mik. In her travelling days as a youth, she saw a creature matching the description of the one we encountered. She said it called itself a \"Sif\", and that it was friendly, but scared. The Sif apparently told her it had completed a mission, but was now lost, and unable to return home. They chatted while she set up camp for the night, but she wasn't able to learn much. When she awoke the next day, it was gone, and she never saw it again.<br><br>She doesn't remember exactly where she encountered the Sif, except that it was somewhere during her journey from XXXXX to XXXXX."
            // ^ if you use double quotes in your body text, you have to type \", ex:
            // body: "I said \"hello,\" but I don't think he was listening..."
        },

        // you can have as many chapters as you want;
        // make sure to put a comma between each { ... } block, if you add more
        {
            title: "Adventurer's Guild",
            body:
                "We're finally starting the \"Adventurer's Guild\". I've long thought that the old tradition of sending children on a journey in order to become adults deserved greater recognition and support; if we can formalize the system, and reward travellers in exchange for their stories, we may be able to learn more about the Sif. I've talked to Tig and Pele; they believe that if I can put together some high-quality books, they can get schools and libraries to buy them. Yino knows some good writers; hopefully we can find one who doesn't need too much money >_>"
        },
        // ^ it's okay to have a comma after the end of the last chapter. it's optional, since
        // no chapters follow, but if you later add a chapter, you might forget to put this
        // comma here, so just save yourself the trouble and always use a comma :P
    ],
    // ^ similarly, THIS comma separates this book from the next book!

    // if you want more books, add them from here on; for example:
    // mySecondBook: [
    //   { title: "Chapter 1", body: "It was a dark and stormy night..." },
    //   { title: "Chapter 2", body: "Storms are pretty great, though, so I was okay with this." },
    // ],
    // you can open the book "mySecondBook" using the following Script in an event:
    //   Scene_Book.start('mySecondBook');
};

/*:
 * @plugindesc Lets you create readable books, each with many chapters.
 * @author Ben Hendel-Doying
 *
 * @help
 * To set up your books, brace yourself: YOU MUST EDIT THIS PLUGIN FILE.
 *
 * Don't be scared! Open it up in a text editor and take a look! Learn by
 * example! (Please don't use Windows' built-in Notepad. Use an IDE, or at least
 * Notepad++.)
 *
 * To show a book, create a Script block in an event, with the following code:
 *
 *   Scene_Book.start('bookId');
 *
 * Replace bookId with the id of the book (check the book list at the top of
 * this plugin for more info).
 *
 * Besides books on bookshelves or other places in the game world, you can also
 * create items which open books when used! To do this, create a common event
 * that opens the book, and set the item's use action to call this common event.
 * DONE! EASY PEASY! (are peas easy?? I don't get this phrase at all...)
 *
 * P.S. This plugin is compatible with - but does not require - YEP_MessageCore.
 * If you also have YEP_MessageCore, the system-wide WordWrap setting will be
 * respected by your book text.
 */


// Scene_Book

function Scene_Book() {
    this.initialize.apply(this, arguments);
}

Scene_Book.book = null;

Scene_Book.start = function(book) {
    if(!Scene_Book.BOOKS.hasOwnProperty(book))
        throw 'Book ID "' + book + '" does not exist.';

    Scene_Book.book = Scene_Book.BOOKS[book];
    SceneManager.push(Scene_Book);
};

Scene_Book.prototype = Object.create(Scene_MenuBase.prototype);
Scene_Book.prototype.constructor = Scene_Book;

Scene_Book.prototype.initialize = function() {
    Scene_MenuBase.prototype.initialize.call(this);
};

Scene_Book.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);
    this.createChapterSelectWindow();
    this.createChapterViewWindow();
};

Scene_Book.prototype.createChapterSelectWindow = function() {
    this._chapterSelectWindow = new Window_Book_Chapter_Select();

    this._chapterSelectWindow.setHandler('cancel', this.popScene.bind(this));

    this.addWindow(this._chapterSelectWindow);
};

Scene_Book.prototype.createChapterViewWindow = function() {
    this._chapterViewWindow = new Window_Book_Chapter_View();

    this._chapterSelectWindow.setChapterView(this._chapterViewWindow);

    this.addWindow(this._chapterViewWindow);
};

// chapter select window

function Window_Book_Chapter_Select() {
    this.initialize.apply(this, arguments);
}

Window_Book_Chapter_Select.prototype = Object.create(Window_Command.prototype);
Window_Book_Chapter_Select.constructor = Window_Book_Chapter_Select;

Window_Book_Chapter_Select.prototype.initialize = function()
{
    Window_Command.prototype.initialize.call(this, 0, 0);
};

Window_Book_Chapter_Select.prototype.windowWidth = function() { return Window_Book_Chapter_Select.WIDTH; };
Window_Book_Chapter_Select.prototype.windowHeight = function() { return Graphics.boxHeight };

Window_Book_Chapter_Select.prototype.setChapterView = function(chapterViewWindow) {
    this._chapterViewWindow = chapterViewWindow;
    this._chapterViewWindow.showChapter(0);
};

Window_Book_Chapter_Select.prototype.makeCommandList = function() {
    Scene_Book.book.forEach(chapter => {
        this.addCommand(chapter.title, 'chapter');
    });
};

Window_Book_Chapter_Select.prototype.select = function(index) {
    Window_Selectable.prototype.select.call(this, index);

    if(this._chapterViewWindow)
        this._chapterViewWindow.showChapter(index);
};

// chapter view window

function Window_Book_Chapter_View() {
    this.initialize.apply(this, arguments);
}

Window_Book_Chapter_View.prototype = Object.create(Window_Base.prototype);
Window_Book_Chapter_View.constructor = Window_Book_Chapter_View;

Window_Book_Chapter_View.prototype.initialize = function()
{
    Window_Base.prototype.initialize.call(this, Window_Book_Chapter_Select.WIDTH, 0, this.windowWidth(), this.windowHeight());
};

Window_Book_Chapter_View.prototype.windowWidth = function() { return Graphics.boxWidth - Window_Book_Chapter_Select.WIDTH; };
Window_Book_Chapter_View.prototype.windowHeight = function() { return Graphics.boxHeight };

Window_Book_Chapter_View.prototype.showChapter = function(index) {
    let text = Scene_Book.book[index].body;

    // use YEP_MessageCore wordwrap, if available
    if($gameSystem.wordWrap && $gameSystem.wordWrap()) text = '<WordWrap>' + text;

    this.contents.clear();
    this.drawTextEx(text, 0, 0, this.windowWidth());
};
