/* tslint:disable:max-line-length */
import { FuseNavigationItem } from '@fuse/components/navigation';

export const defaultNavigation: FuseNavigationItem[] = [
    {
        id   : 'example',
        title: 'Example',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/example'
    },
 
    {
        id      : 'acceuil',
        title   : 'Espace Ressource',
        type    : 'collapsable',
        icon    : 'heroicons_outline:home',
        link    : '/acceuil',
        children: [
            {
                id        : 'acceuil',
                title     : 'Home',
                type      : 'basic',
                link      : '/acceuil'
            },
            {
                id   : 'stat',
                title: 'Statistique',
                type : 'basic',
                // icon : 'heroicons_outline:chart-pie',
                link : '/stat'
            },
            {
                id   : 'espaceUser',
                title: 'Espace User',
                type : 'basic',
                // icon : 'heroicons_outline:chart-pie',
                link : '/espaceUser'
            }
        ]
    },
];
export const compactNavigation: FuseNavigationItem[] = [
    {
        id   : 'example',
        title: 'Example',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/example'
    }
];
export const futuristicNavigation: FuseNavigationItem[] = [
    {
        id   : 'example',
        title: 'Example',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/example'
    }
];
export const horizontalNavigation: FuseNavigationItem[] = [
    {
        id   : 'example',
        title: 'Example',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/example'
    }
];
