import { Pipe, PipeTransform } from '@angular/core';

import moment from 'moment';

@Pipe({ name: 'UTC' })
export class UTCPipe implements PipeTransform {
    transform(input: any, format: boolean): any {
        if(format) {
            return moment.utc(input, 'MM/DD/YYYY HH:mm:ss').format('MM/DD/YYYY HH:mm:ss');
        } else {
            return moment.utc(input).format('MM/DD/YYYY HH:mm:ss');
        }
    }
}
