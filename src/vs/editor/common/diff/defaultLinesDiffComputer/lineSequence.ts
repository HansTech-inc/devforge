/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { CharCode } from '../../../../base/common/charCode.js';
import { OffsetRange } from '../../core/offsetRange.js';
import { ISequence, ITimeout, InfiniteTimeout } from './algorithms/diffAlgorithm.js';

export class LineSequence implements ISequence {
	constructor(
		private readonly trimmedHash: number[],
		private readonly lines: string[]
	) { }

	getElement(offset: number): number {
		return this.trimmedHash[offset];
	}

	get length(): number {
		return this.trimmedHash.length;
	}

	getBoundaryScore(length: number): number {
		const indentationBefore = length === 0 ? 0 : getIndentation(this.lines[length - 1]);
		const indentationAfter = length === this.lines.length ? 0 : getIndentation(this.lines[length]);
		return 1000 - (indentationBefore + indentationAfter);
	}

	getText(range: OffsetRange): string {
		return this.lines.slice(range.start, range.endExclusive).join('\n');
	}

	isStronglyEqual(offset1: number, offset2: number): boolean {
		return this.lines[offset1] === this.lines[offset2];
	}

	computeSimilarity(other: LineSequence, timeout: ITimeout = InfiniteTimeout.instance): number {
		if (!timeout.isValid()) {
			return 0;
		}

		const minLength = Math.min(this.length, other.length);
		let similarity = 0;

		for (let i = 0; i < minLength; i++) {
			if (!timeout.isValid()) {
				return 0;
			}

			if (this.getElement(i) === other.getElement(i)) {
				similarity++;
			}
		}

		return similarity / minLength;
	}
}

function getIndentation(str: string): number {
	let i = 0;
	while (i < str.length && (str.charCodeAt(i) === CharCode.Space || str.charCodeAt(i) === CharCode.Tab)) {
		i++;
	}
	return i;
}
