import type { ManifestCollectionView } from '@umbraco-cms/backoffice/extension-registry';

export const manifests: Array<ManifestCollectionView> = [
	{
		type: 'collectionView',
		alias: 'Umb.CollectionView.MediaGrid',
		name: 'Media Grid Collection View',
		loader: () => import('./media-grid-collection-view.element.js'),
		weight: 300,
		meta: {
			label: 'Grid',
			icon: 'icon-grid',
			pathName: 'grid',
		},
		conditions: {
			entityType: 'media',
		},
	},
	{
		type: 'collectionView',
		alias: 'Umb.CollectionView.MediaTable',
		name: 'Media Table Collection View',
		loader: () => import('./media-table-collection-view.element.js'),
		weight: 200,
		meta: {
			label: 'Table',
			icon: 'icon-box',
			pathName: 'table',
		},
		conditions: {
			entityType: 'media',
		},
	},
	{
		type: 'collectionView',
		alias: 'Umb.CollectionView.Test',
		name: 'Test',
		elementName: 'umb-collection-view-media-test',
		loader: () => import('./collection-view-media-test.element.js'),
		weight: 100,
		meta: {
			label: 'Test',
			icon: 'icon-newspaper',
			pathName: 'test',
		},
		conditions: {
			entityType: 'media',
		},
	},
];
