import {
  Directive, Input, OnInit,
  ViewContainerRef, SimpleChanges,
  TemplateRef, OnChanges,
} from '@angular/core';

export class RangeContext {
    constructor(public $implicit: number) {}
}

/* tslint:disable */
@Directive({
  selector: '[range][rangeTo]'
})
export class RangeDirective implements OnInit, OnChanges {
    @Input('rangeFrom')
    start: number;
    @Input('rangeTo')
    end: number;

    // 记录上一次的数值
    private last = {
        start: 0,
        end: 0,
    };

    constructor(
        private viewcontainer: ViewContainerRef,
        private templateRef: TemplateRef<RangeContext>) { }

    ngOnInit() {
        if (this.end > this.start) {
            // this.applyChanges();
        } else {
            console.warn('to后的参数不应该比from小');
            return;
        }
    }

    ngOnChanges(changes: SimpleChanges) {
        if ('start' in changes || 'end' in changes) {
            if (this.start === undefined) {
                if (this.end < 0) {
                    console.warn('from默认为0，此时to后的参数不能为负');
                    return;
                }
                this.start = 0;
            }
            if (this.end > this.start) {
                this.applyChanges();
            } else {
                console.warn('to后的参数不应该比from小（from默认为0）');
            }
        }
    }
    
    private applyChanges() {
        let lastStart = this.last.start;
        let lastEnd = this.last.end;
        let start = this.start;
        let end = this.end;
        if (lastStart !== this.start ||
                lastEnd !== this.end) {
            // 找出要添加或删除的项（只可能操作两头）
            if (start > lastEnd || end < lastStart) {
                this.viewcontainer.clear();
                this.updateList(start, end);
            } else {
                // 前面判断
                if (start < lastStart) {
                    // 前面加
                    this.updateList(start, lastStart);
                } else if (start > lastStart) {
                    // 前面减
                    this.updateList(lastStart, start, false);
                }

                // 后面判断
                if (end < lastEnd) {
                    // 后面减
                    this.updateList(end, lastEnd, false, false);
                } else if (end > lastEnd) {
                    // 后面加
                    this.updateList(lastEnd, end, true, false);
                }
            }
            // 最后修改last值
            this.last.start = this.start;
            this.last.end = this.end;
        }
    }
    private updateList(start, end, isAdd = true, isFront = true) {
        let index = 0;
        if (!isFront) {
            index = this.viewcontainer.length;
        }
        for (let i = start; i < end; i ++) {
            if (isAdd) { // 添加View
                let view = this.viewcontainer.createEmbeddedView(
                    this.templateRef, new RangeContext(i), index);
                index ++; // 不管前面还是后面，都要加
                // view.detectChanges();
            } else { // 删除View
                if (!isFront) {
                    --index; // 反着删
                }
                this.viewcontainer.remove(index);
            }
        }
    }
}
