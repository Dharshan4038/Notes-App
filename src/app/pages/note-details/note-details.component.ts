import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router, Params} from '@angular/router';
import { Note } from 'src/app/shared/note.model';
import { NotesService } from 'src/app/shared/notes.service';

@Component({
  selector: 'app-note-details',
  templateUrl: './note-details.component.html',
  styleUrls: ['./note-details.component.css']
})
export class NoteDetailsComponent implements OnInit {

  note!: Note;
  name = "Angular";
  noteId: number;
  new: boolean;

  constructor(private notesService: NotesService,private router: Router,private route: ActivatedRoute) { }

  ngOnInit(): void {
    // we want to find out if we are editing the old note or createing new one
    this.route.params.subscribe((params: Params) => {
      this.note = new Note();
      if(params['id']) {
        this.note = this.notesService.get(params['id']);
        this.noteId = params['id'];
        this.new = false;
      }
      else {
        this.new = true;
      }
    })
  }

  onSubmit(form: NgForm) {
    if(this.new) {
      // Save the Notes
      this.notesService.add(form.value);
    }
    else {
      this.notesService.update(this.noteId,form.value.title,form.value.body);
    }
    this.router.navigateByUrl('/');
  }

  cancel() {
    this.router.navigateByUrl('/');
  }


}
