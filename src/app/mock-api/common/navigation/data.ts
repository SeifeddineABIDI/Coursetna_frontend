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
                id        : 'example',
                title     : 'Example',
                type      : 'basic',
                icon : 'heroicons_outline:chart-pie',
                link      : '/example',
                exactMatch: true
            },
            {
                id   : 'example2',
                title: 'Example2',
                type : 'basic',
                icon : 'heroicons_outline:chart-pie',
                link : '/example2'
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
        id   : 'example2',
        title: 'Example2',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/example2'
    }
];
