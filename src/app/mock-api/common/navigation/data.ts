/* tslint:disable:max-line-length */
import { FuseNavigationItem } from '@fuse/components/navigation';

export const defaultNavigation: FuseNavigationItem[] = [
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
    {
        id   : 'quizList',
        title: 'Manage Quiz',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/quizList'
    },
    {
        id   : 'quiz',
        title: 'Quiz',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/quiz'
    },
    {
        id   : 'statistique',
        title: 'statistique',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/statistique'
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
        id   : 'listReclamation',
        title: 'listReclamation',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/listReclamation'
    },
    
    {
        id      : 'apps.help-center',
        title   : 'Forum',
        type    : 'collapsable',
        icon    : 'heroicons_outline:support',
        link    : '/help-center',
        children: [
            {
                id        : 'apps.help-center.home',
                title     : 'Home',
                type      : 'basic',
                link      : '/help-center',
                exactMatch: true
            },
            {
                id   : 'apps.help-center.faqs',
                title: 'FAQs',
                type : 'basic',
                link : '/help-center/faqs'
            },
            {
                id   : 'apps.help-center.guides',
                title: 'Subforum',
                type : 'basic',
                link : '/help-center/guides'
            },
            {
                id   : 'apps.help-center.support',
                title: 'Post',
                type : 'basic',
                link : '/help-center/support'
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
    },
    {
        id   : 'quiz',
        title: 'Quiz',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/quiz'
    }
];
