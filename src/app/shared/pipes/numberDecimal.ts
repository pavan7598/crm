import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'numDecimal' })
export class DecimalPipe implements PipeTransform {
    transform(value: any, base: number): any {
        // debugger
        // console.log(typeof (value))
        if (value) {
            if (typeof (value) == 'string') {
                return value;
            }
            else {
                // let num = value.toString().split('.');
                // if (num.length < 2) {
                //     return num;
                // }
                // else {
                //     let num1 = num[0].split('');
                //     num1.push('.');
                //     let num2 = num[1].slice(0, 2);
                //     num1.push(num2);
                //     let number = num1.join('');
                //     return number;

                // }

                return value.toLocaleString(undefined, {maximumFractionDigits:2});

            }
        }
    }
}