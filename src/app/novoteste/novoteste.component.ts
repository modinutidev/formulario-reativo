import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-novoteste',
  templateUrl: './novoteste.component.html',
  styleUrls: ['./novoteste.component.css'],
})
export class NovotesteComponent implements OnInit {
  constructor(private fb: FormBuilder) {}

  myForm!: FormGroup;
  meta!: any;

  get getRespostas() {
    return this.myForm.get('respostas') as FormArray;
  }

  addInsumo(item: any, index: number) {
    this.getRespostas.insert(
      index + 1, //index + 1 para adicionar a frente
      this.fb.group({
        id_pergunta: item.value['id_pergunta'],
        tipo: item.value['tipo'],
        insumo: [],
        quantidade: [],
        undMedida: [],
      })
    );
  }

  perguntas = [
    {
      id: 1,
      label: 'Lorem 1',
      tipo: 'insumo',
    },
    {
      id: 2,
      label: 'Lorem 2',
      tipo: 'numero',
      resposta: 'sim',
    },
    // {
    //   id: 3,
    //   label: 'Lorem 3',
    //   tipo: 'numero',
    //   resposta: null,
    // },
  ];

  ngOnInit(): void {
    this.myForm = this.fb.group({
      respostas: this.fb.array([]),
    });

    this.myForm.valueChanges.subscribe((res) => (this.meta = res));

    //Construir as respostas
    this.perguntas.forEach((p) => {
      //verificar o tipo da resposta
      let tipo: any;
      if (p.tipo === 'insumo') {
        tipo = {
          id_pergunta: p.id,
          tipo: p.tipo,
          insumo: [],
          quantidade: [],
          undMedida: [],
        };
      }
      if (p.tipo === 'numero') {
        tipo = {
          id_pergunta: p.id,
          tipo: p.tipo,
          resposta: p.resposta,
        };
      }
      let resposta = this.fb.group(tipo);
      this.getRespostas.push(resposta);
    });
  }
}
