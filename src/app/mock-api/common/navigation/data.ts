/* tslint:disable:max-line-length */
import { FuseNavigationItem } from '@fuse/components/navigation';

export const defaultNavigation: FuseNavigationItem[] = [
    {
        id   : 'acceuil',
        title: 'Ressources',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/acceuil'
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
    },
    
    {

        id   : 'forum',
        title: 'Testing',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/forum'
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
 
            {
                id   : 'settings',
                title: 'Settings',
                type : 'basic',
                icon : 'heroicons_outline:chart-pie',
                link : '/settings'
            },
            {
                id   : 'forgot',
                title: 'Forgot-password',
                type : 'basic',
                icon : 'heroicons_outline:Home',
                link : '/forgot'
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
    },
    {
        id   : 'quiz',
        title: 'Quiz',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/quiz'
    }
];
