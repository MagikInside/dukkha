import { Injectable } from '@angular/core';
import { Answers } from '../models/answers.model';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  canContinue(answers: Answers, step: number ): boolean {
    if(step === 0 || step === 2) {
      return true;
    } else if(step === 1) {
      return answers.length === 2;
    } else if(step === 3) {
      return answers.length === 6;
    }
    else if(step === 4) {
      return true;
    }
    else if(step === 5) {
      return true;
    }
    else if(step === 7) {
      return true;
    }
    return false;
  }
}
