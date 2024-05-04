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
        id   : 'reclamation',
        title: 'reclamationAdmin',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/reclamation',
       
    },
    
    {
        id: 'addreclamation', // Corrected spelling
        title: 'Reclamation User', // Corrected spelling and added space
        type: 'basic',
        icon: 'heroicons_outline:chart-pie',
        link: '/addreclamation' // Use {{}} to bind dynamicId
    },
    {
        id   : 'stat',
        title: 'stat',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/stat'
    },
    {
        id   : 'reponse',
        title: 'reponse',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/reponse'
    },
    {
        id   : 'listReclamation',
        title: 'listReclamation',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/listReclamation'
    }
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
