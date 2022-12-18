db.books.insertMany([
{
id: 1,
title: 'book1',
description: 'good book',
authors: 'Pelevin',
},
{
id: 2,
title: 'book2',
description: 'good book',
authors: 'Pushkin',
},
]);

db.books.find({title: "book1"})

db.books.updateOne({id : 2}, {$set: {description : 'cool book', authors: 'Lermontov'}})
