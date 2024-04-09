import { UMB_DOCUMENT_ENTITY_TYPE } from '../../entity.js';
import { UMB_USER_PERMISSION_DOCUMENT_PUBLIC_ACCESS } from '../../user-permissions/index.js';
import { UmbDocumentPublicAccessEntityAction } from './public-access.action.js';
import type { ManifestTypes } from '@umbraco-cms/backoffice/extension-registry';

const entityActions: Array<ManifestTypes> = [
	{
		type: 'entityAction',
		kind: 'default',
		alias: 'Umb.EntityAction.Document.PublicAccess',
		name: 'Document Permissions Entity Action',
		weight: 200,
		api: UmbDocumentPublicAccessEntityAction,
		forEntityTypes: [UMB_DOCUMENT_ENTITY_TYPE],
		meta: {
			icon: 'icon-lock',
			label: 'Restrict Public Access...',
		},
		conditions: [
			{
				alias: 'Umb.Condition.UserPermission.Document',
				allOf: [UMB_USER_PERMISSION_DOCUMENT_PUBLIC_ACCESS],
			},
		],
	},
];

const manifestModals: Array<ManifestTypes> = [
	{
		type: 'modal',
		alias: 'Umb.Modal.PublicAccess',
		name: 'Public Access Modal',
		js: () => import('./modal/public-access-modal.element.js'),
	},
];

export const manifests = [...entityActions, ...manifestModals];
