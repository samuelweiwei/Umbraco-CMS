import type { UmbEntityBulkActionArgs } from '@umbraco-cms/backoffice/entity-bulk-action';
import { UmbEntityBulkActionBase } from '@umbraco-cms/backoffice/entity-bulk-action';
import type { UmbControllerHost } from '@umbraco-cms/backoffice/controller-api';

export class UmbDuplicateMediaEntityBulkAction extends UmbEntityBulkActionBase<never> {
	constructor(host: UmbControllerHost, args: UmbEntityBulkActionArgs<never>) {
		super(host, args);
	}

	async execute() {
		console.log('execute bulk duplicate');
	}

	destroy(): void {}
}
