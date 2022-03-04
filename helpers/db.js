import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('places.db');

export const init = () => {
    db.transaction( (tx) => {
        tx.executeSql('CREATE_TABLE IF NOT EXISTS places (id INTEGER PRIMARY KEY NOT NULL, title TEXT NOT NULL, imageUri TEXT NOT NULL, address TEXT NOT NULL, lat REAL NOT NULL, lng REAL NOT NULL);',
        [],
        //success function
        ()=>{

        },
        //error function
        (_,err)=>{

        }
        );
    });
};
