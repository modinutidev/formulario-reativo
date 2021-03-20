import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-questionario',
  templateUrl: './questionario.component.html',
  styleUrls: ['./questionario.component.css'],
})
export class QuestionarioComponent implements OnInit {
  constructor(private fb: FormBuilder) {}

  myForm!: FormGroup;
  meta!: any;

  insumoFormGroup = this.fb.group([
    {
      insumo: '',
      quantidade: '',
      undMedida: '',
    },
  ]);

  perguntaFormGroup = this.fb.group([
    {
      disciplina: [],
      tipo: [],
      id: [],
      pergunta: [],
      perguntas: this.fb.array([]),
    },
  ]);

  get respostaPergunta() {
    return this.perguntaFormGroup.get('perguntas') as FormArray;
  }

  perguntas = [
    {
      disciplina: 'HISTORIA',
      tipo: 'TEXTO',
      id: '1',
      pergunta: 'Quem descobriu o Brasil?',
      resposta: '',
    },
    {
      disciplina: 'MATEMATICA',
      tipo: 'NUMERO',
      id: '2',
      pergunta: '10+10?',
      resposta: '',
    },
    {
      disciplina: 'MATEMATICA',
      tipo: 'NUMERO',
      id: '2',
      pergunta: '11+2000?',
      resposta: [],
    },
    {
      disciplina: 'INSUMO',
      tipo: 'INSUMO',
      id: '2',
      pergunta: 'PERGUNTA DO INSUMO',
      resposta: [],
    },
  ];

  ngOnInit(): void {
    this.myForm = this.fb.group({
      nome: '',
      email: '',
      perguntas: this.fb.array([]),
    });

    this.myForm.valueChanges.subscribe((data) => (this.meta = data));

    this.perguntas.forEach((p) => {
      this.getPerguntas.push(this.fb.group(p));
      // this.getPerguntas.push(this.perguntaFormGroup);
    });
  }

  pergunta = {
    disciplina: 'INSUMO',
    tipo: 'NUMERO',
    id: '2',
    pergunta: 'INSUMO',
    resposta: '',
  };

  add(p: any, i: number) {
    console.log(p);
    this.getPerguntas.insert(i + 1, p);
  }

  remove(index: any) {
    console.log(index);
    this.getPerguntas.removeAt(index);
  }

  get getPerguntas() {
    return this.myForm.get('perguntas') as FormArray;
  }
}
