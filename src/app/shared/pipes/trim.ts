import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'trim' })
export class TrimPipe implements PipeTransform {
    transform(input: string): string {
        return input.trim();
    }
}
