import { Component, OnInit } from '@angular/core';
import { Note } from 'src/app/shared/note.model';
import { NotesService } from 'src/app/shared/notes.service';
import { NoteCardComponent } from 'src/app/note-card/note-card.component';

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.css']
})
export class NotesListComponent implements OnInit {

  notes: Note[] = new Array<Note>();
  constructor(private noteService: NotesService) { }

  ngOnInit(): void {
    this.notes = this.noteService.getAll();
  }

  deleteNote(id: number) {
    this.noteService.delete(id);
  }

}
