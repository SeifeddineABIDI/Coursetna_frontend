import { AfterViewInit, Component, ElementRef, HostBinding, HostListener, Inject, NgZone, OnDestroy, OnInit, Renderer2, ViewChild, ViewEncapsulation } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ScrollStrategy, ScrollStrategyOptions } from '@angular/cdk/overlay';
import { Subject, takeUntil } from 'rxjs';
import { QuickChatService } from 'app/layout/common/quick-chat/quick-chat.service';
import { Chat } from 'app/layout/common/quick-chat/quick-chat.types';
import { Discussion } from './models/Discussion';
import { Message } from './models/Message';
import { User, TypeUser, UserClass } from './models/User';
import { DiscussionService } from './services/discussion.service';
import { MessageService } from './services/message.service';
import { ReactionService } from './services/reaction.service';
import { DatePipe } from '@angular/common';
import { waitForAsync } from '@angular/core/testing';
import { has } from 'lodash';

@Component({
    selector: 'quick-chat',
    templateUrl: './quick-chat.component.html',
    styleUrls: ['./quick-chat.component.scss'],
    encapsulation: ViewEncapsulation.None,
    exportAs: 'quickChat'
})
export class QuickChatComponent implements OnInit, AfterViewInit, OnDestroy {

    discussions: Discussion[] = [];
    communities: Discussion[] = [];
    users: User[] = [];
    usersPre: User[] = [];
    messages: Message[] = [];

    sendMessageo!: string;
    editreplyMessageo!: string;
    forwardingo!: string;

    prenomInput!: string;
    nomInput!: string;
    imageData: string | ArrayBuffer | null = " ";
    imageDatam: string | ArrayBuffer | null = " ";

    currentUserId: number | null = parseInt(localStorage.getItem('currentUserId')!);
    currentDiscussion: number | null = parseInt(localStorage.getItem('currentDiscussion')!);
    currentCommunity: number | null = parseInt(localStorage.getItem('currentCommunity')!);
    currentDiscussionTitle!: string;
    currentDiscussionType!: string;
    currentCommunityTitle!: string;
    currentMessage: any = null;

    forwardins: boolean = false;

    showModala: boolean = false;
    showModalb: boolean = false;
    showModalc: boolean = false;
    showModald: boolean = false;
    showModale: boolean = false;

    showFEmoji: boolean = false;
    showFTranslate: boolean = false;
    showPinsB: boolean = false;

    inputTitle: string = '';
    channels: string[] = [''];
    userDiscussion: any[] = [];
    existingUsers: any[] = [];
    existingChannels: string[] = [];

    intervalId: any;
    formattedDate: string | undefined;

    languages: string[] = [
        'Afrikaans', 'Albanian', 'Amharic', 'Arabic', 'Armenian', 'Azerbaijani',
        'Basque', 'Belarusian', 'Bengali', 'Bosnian', 'Bulgarian', 'Burmese',
        'Catalan', 'Cebuano', 'Chichewa', 'Chinese', 'Corsican', 'Croatian',
        'Czech', 'Danish', 'Dutch', 'English', 'Esperanto', 'Estonian', 'Farsi',
        'Filipino', 'Finnish', 'French', 'Frisian', 'Galician', 'Georgian', 'German',
        'Greek', 'Gujarati', 'Haitian Creole', 'Hausa', 'Hawaiian', 'Hebrew', 'Hindi',
        'Hmong', 'Hungarian', 'Icelandic', 'Igbo', 'Indonesian', 'Irish', 'Italian',
        'Japanese', 'Javanese', 'Kannada', 'Kazakh', 'Khmer', 'Kinyarwanda', 'Korean',
        'Kurdish', 'Kyrgyz', 'Lao', 'Latin', 'Latvian', 'Lithuanian', 'Luxembourgish',
        'Macedonian', 'Malagasy', 'Malay', 'Malayalam', 'Maltese', 'Maori', 'Marathi',
        'Mongolian', 'Nepali', 'Norwegian', 'Odia', 'Pashto', 'Persian', 'Polish',
        'Portuguese', 'Punjabi', 'Romanian', 'Russian', 'Samoan', 'Scottish Gaelic',
        'Serbian', 'Sesotho', 'Shona', 'Sindhi', 'Sinhala', 'Slovak', 'Slovenian',
        'Somali', 'Spanish', 'Sundanese', 'Swahili', 'Swedish', 'Tajik', 'Tamil',
        'Telugu', 'Thai', 'Turkish', 'Ukrainian', 'Urdu', 'Uzbek', 'Vietnamese',
        'Welsh', 'Xhosa', 'Yiddish', 'Yoruba', 'Zulu'
    ].sort(); // Sort alphabetically

    selectedLanguage: string = '';

    translated: string = '';

    @ViewChild('messageInput') messageInput: ElementRef;
    chat: Chat;
    chats: Chat[];
    opened: boolean = false;
    selectedChat: Chat;
    private _mutationObserver: MutationObserver;
    private _scrollStrategy: ScrollStrategy = this._scrollStrategyOptions.block();
    private _overlay: HTMLElement;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private messageService: MessageService, private discussionService: DiscussionService, private reactionService: ReactionService, private datePipe: DatePipe,
        @Inject(DOCUMENT) private _document: Document,
        private _elementRef: ElementRef,
        private _renderer2: Renderer2,
        private _ngZone: NgZone,
        private _quickChatService: QuickChatService,
        private _scrollStrategyOptions: ScrollStrategyOptions
    ) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Decorated methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Host binding for component classes
     */
    @HostBinding('class') get classList(): any {
        return {
            'quick-chat-opened': this.opened
        };
    }

    /**
     * Resize on 'input' and 'ngModelChange' events
     *
     * @private
     */
    @HostListener('input')
    @HostListener('ngModelChange')
    private _resizeMessageInput(): void {
        // This doesn't need to trigger Angular's change detection by itself
        this._ngZone.runOutsideAngular(() => {

            setTimeout(() => {

                // Set the height to 'auto' so we can correctly read the scrollHeight
                this.messageInput.nativeElement.style.height = 'auto';

                // Get the scrollHeight and subtract the vertical padding
                this.messageInput.nativeElement.style.height = `${this.messageInput.nativeElement.scrollHeight}px`;
            });
        });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {

        const currentUser = localStorage.getItem("currentUser") ;
        const userObject = JSON.parse(currentUser);
        this.currentUserId =  parseInt(userObject.id);
        localStorage.setItem("currentUserId",this.currentUserId.toString());
        


        this.usersPre = [
            {
                id: 1,
                nom: 'Salma',
                prenom: 'Mejri',
                email: 'w@gmail.com',
                password: 'w',
                role: TypeUser.ADMIN,
                photo: 'https://i.pinimg.com/736x/96/b8/40/96b8406b53c04aae7792dea99197ae4d.jpg',
                isArchived: false,
                isBanned: false
            },
            {
                id: 2,
                nom: 'Yassin',
                prenom: 'Mezni',
                email: 'y@gmail.com',
                password: 'y',
                role: TypeUser.ADMIN,
                photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Paramecium.jpg/640px-Paramecium.jpg',
                isArchived: false,
                isBanned: false
            },
            {
                id: 3,
                nom: 'Abidi',
                prenom: 'Seifeddine',
                email: 'x@gmail.com',
                password: 'x',
                role: TypeUser.ADMIN,
                photo: 'https://upload.wikimedia.org/wikipedia/commons/9/99/Elon_Musk_Colorado_2022_%28cropped2%29.jpg',
                isArchived: false,
                isBanned: false
            },
            {
                id: 4,
                nom: 'Ghofran',
                prenom: 'Rahmoni',
                email: 'w@gmail.com',
                password: 'w',
                role: TypeUser.ADMIN,
                photo: 'https://i.pinimg.com/736x/f3/1e/a0/f31ea05d300cfe3aebfc0576d0faba10.jpg',
                isArchived: false,
                isBanned: false
           
            },
        ];

        this.usersPre = [];

        this.usersPre = this.usersPre.filter((user) => user.id !== this.currentUserId);


        this.currentDiscussionTitle = "Discussions";
        this.currentCommunityTitle = "";


        if (localStorage.getItem('currentCommunity')) {
            this.selectCommunity(parseInt(localStorage.getItem('currentCommunity')!))
            this.currentCommunity = parseInt(localStorage.getItem("currentCommunity")!)
            this.currentCommunityTitle = localStorage.getItem("currentCommunityTitle");

        } else {
            this.currentCommunity = 0;
            this.currentCommunityTitle = "";
            this.retrieveAllDiscussions();
        }
        if (localStorage.getItem('currentDiscussion')) {
            this.retrieveAllMessages(parseInt(localStorage.getItem('currentDiscussion')!));
            this.currentDiscussion = parseInt(localStorage.getItem("currentDiscussion")!)
            this.currentDiscussionTitle = localStorage.getItem("currentDiscussionTitle") ;
        }

        this.intervalId = setInterval(() => {
            this.retrieveAllCommunities();
            this.retrieveRecentMessages();
            if (!localStorage.getItem('currentCommunity')) {
                this.retrieveAllDiscussions();
            }

        }, 5000);

        


    }

    /**
     * After view init
     */
    ngAfterViewInit(): void {
        // Fix for Firefox.
        //
        // Because 'position: sticky' doesn't work correctly inside a 'position: fixed' parent,
        // adding the '.cdk-global-scrollblock' to the html element breaks the navigation's position.
        // This fixes the problem by reading the 'top' value from the html element and adding it as a
        // 'marginTop' to the navigation itself.
        this._mutationObserver = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                const mutationTarget = mutation.target as HTMLElement;
                if (mutation.attributeName === 'class') {
                    if (mutationTarget.classList.contains('cdk-global-scrollblock')) {
                        const top = parseInt(mutationTarget.style.top, 10);
                        this._renderer2.setStyle(this._elementRef.nativeElement, 'margin-top', `${Math.abs(top)}px`);
                    }
                    else {
                        this._renderer2.setStyle(this._elementRef.nativeElement, 'margin-top', null);
                    }
                }
            });
        });
        this._mutationObserver.observe(this._document.documentElement, {
            attributes: true,
            attributeFilter: ['class']
        });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        clearInterval(this.intervalId);
        // Disconnect the mutation observer
        this._mutationObserver.disconnect();

        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Open the panel
     */
    open(): void {
        // Return if the panel has already opened
        if (this.opened) {
            return;
        }

        // Open the panel
        this._toggleOpened(true);
    }

    /**
     * Close the panel
     */
    close(): void {
        // Return if the panel has already closed
        if (!this.opened) {
            return;
        }

        // Close the panel
        this._toggleOpened(false);
    }

    /**
     * Toggle the panel
     */
    toggle(): void {
        if (this.opened) {
            this.close();
        }
        else {
            this.open();
        }
    }

    /**
     * Select the chat
     *
     * @param id
     */
    selectChat(id: string): void {
        // Open the panel
        this._toggleOpened(true);

        // Get the chat data

    }

    /**
     * Track by function for ngFor loops
     *
     * @param index
     * @param item
     */
    trackByFn(index: number, item: any): any {
        return item.id || index;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Show the backdrop
     *
     * @private
     */
    private _showOverlay(): void {
        // Try hiding the overlay in case there is one already opened
        this._hideOverlay();

        // Create the backdrop element
        this._overlay = this._renderer2.createElement('div');

        // Return if overlay couldn't be create for some reason
        if (!this._overlay) {
            return;
        }

        // Add a class to the backdrop element
        this._overlay.classList.add('quick-chat-overlay');

        // Append the backdrop to the parent of the panel
        this._renderer2.appendChild(this._elementRef.nativeElement.parentElement, this._overlay);

        // Enable block scroll strategy
        this._scrollStrategy.enable();

        // Add an event listener to the overlay
        this._overlay.addEventListener('click', () => {
            this.close();
        });
    }

    /**
     * Hide the backdrop
     *
     * @private
     */
    private _hideOverlay(): void {
        if (!this._overlay) {
            return;
        }

        // If the backdrop still exists...
        if (this._overlay) {
            // Remove the backdrop
            this._overlay.parentNode.removeChild(this._overlay);
            this._overlay = null;
        }

        // Disable block scroll strategy
        this._scrollStrategy.disable();
    }

    /**
     * Open/close the panel
     *
     * @param open
     * @private
     */
    private _toggleOpened(open: boolean): void {
        // Set the opened
        this.opened = open;

        // If the panel opens, show the overlay
        if (open) {
            this._showOverlay();
        }
        // Otherwise, hide the overlay
        else {
            this._hideOverlay();
        }
    }

    onEnter(event: KeyboardEvent): void {
        // Prevent the default behavior (adding a newline)
        event.preventDefault();

        // Call the function to send the message
        this.sendMessage();
    }


    openModala() {
        this.users = this.usersPre;
        this.userDiscussion = [];
        this.showModala = true;
    }

    openModalb() {
        this.users = this.usersPre;
        this.userDiscussion = [];
        this.showModalb = true;
    }

    openModalc() {
        this.pmodifyDiscussion()
        this.showModalc = true;
    }

    openModald() {
        this.pmodifyCommunity()
        this.showModald = true;
    }

    openModale() {
        this.paddAdmins()
        this.showModale = true;
    }

    closeModala() {
        this.showModala = false;
    }

    closeModalb() {
        this.showModalb = false;
    }

    closeModalc() {
        this.showModalc = false;
    }

    closeModald() {
        this.showModald = false;
    }

    closeModale() {
        this.showModale = false;
    }

    handlemodclick(): void {
        if (this.currentCommunity != 0) {
            this.openModald();
        }
        else if (this.currentDiscussionType === 'Group') {
            this.openModalc();
        }
    }

    addChannel() {
        this.channels.push('');
        this.existingChannels.push('');
    }

    removeChannel() {
        if (this.channels.length > 1) {
            this.channels.pop();
        }
        if (this.existingChannels.length > 1) {
            this.existingChannels.pop();
        }
    }


    handleFileInput(event: any): void {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e: any) => {
                const originalImage = new Image();
                originalImage.onload = () => {
                    // Define desired width and height for the downscaled image
                    const desiredWidth = 300; // Change this to your desired width
                    const aspectRatio = originalImage.width / originalImage.height;
                    const desiredHeight = desiredWidth / aspectRatio;

                    // Create an off-screen canvas to draw the downscaled image
                    const canvas = document.createElement("canvas");
                    canvas.width = desiredWidth;
                    canvas.height = desiredHeight;

                    const context = canvas.getContext("2d");
                    if (context) {
                        // Draw the original image onto the canvas with the new dimensions
                        context.drawImage(originalImage, 0, 0, desiredWidth, desiredHeight);

                        // Get the data URL from the canvas
                        this.imageData = canvas.toDataURL("image/jpeg"); // You can specify other formats like 'image/png'
                        this.imageDatam = canvas.toDataURL("image/jpeg"); // You can specify other formats like 'image/png'

                    }
                };

                // Set the source of the image to the data read from the file
                originalImage.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    }

    toggleUserSelection(user: any) {
        const index = this.userDiscussion.indexOf(user);
        if (index === -1) {
            // User not in list, add them
            this.userDiscussion.push(user);
        } else {
            // User is in the list, remove them
            this.userDiscussion.splice(index, 1);
        }
    }

    isUserSelected(user: any) {
        return this.userDiscussion.includes(user);
    }

    retrieveUsersForDiscussion() {
        const id = this.currentUserId;
        this.discussionService.retrieveUsersForDiscussion(this.prenomInput,this.nomInput)
            .subscribe(users => this.users = users);
            this.users = this.users.filter((user) => user.id !== this.currentUserId);

    }

    startDiscussion() {



        this.closeModala();
        const userDiscussionIds = this.userDiscussion.map((u) => u.id);
        if (userDiscussionIds.length === 1) {
            // Start a Duo discussion with the single user
            const otherUserId = userDiscussionIds[0];
            this.discussionService.startDiscussionDuo(this.currentUserId, otherUserId).subscribe(
                (response) => {
                    console.log('Duo discussion started successfully');
                    // Optionally, call a function to refresh the list of discussions
                },
                (error) => {
                    alert('Error starting Duo discussion: ' + error);
                    console.error('Error starting Duo discussion:', error);
                }
            );
        } else if (userDiscussionIds.length > 1) {
            const discussionTitle = this.inputTitle;
            const userList = this.userDiscussion.map((u) => u.id).join('_');
            if (this.inputTitle.length == 0) {
                alert("Please insert a title if it is going to be a group discussion.");
            } else {
                this.discussionService.startDiscussionGroup(this.currentUserId, discussionTitle, userList, this.imageData).subscribe(
                    (response) => {
                        console.log('Group discussion started successfully');
                        this.retrieveAllDiscussions()
                    },
                    (error) => {
                        alert('Error starting Group discussion: ' + error);
                        console.error('Error starting Group discussion:', error);
                    }
                );
            }
        } else {
            alert('No users selected for starting a discussion');
        }
    }


    startCommunity() {
        this.closeModalb();
        const channelString = this.channels.join('_');
        const userDiscussionIds = this.userDiscussion.map((u) => u.id);
        const discussionTitle = this.inputTitle;
        if (this.inputTitle.length == 0) {
            alert("Please insert a title.");
        } else {
            if (userDiscussionIds.length === 0) {


                this.discussionService.startDiscussionCommunity(this.currentUserId, discussionTitle, "", channelString, this.imageData).subscribe(
                    (response) => {
                        console.log('Community discussion started successfully');
                    },
                    (error) => {
                        alert('Error starting Community discussion: ' + error);
                        console.error('Error starting Community discussion:', error);
                    }
                );

            } else if (userDiscussionIds.length > 1) {
                const userList = this.userDiscussion.map((u) => u.id).join('_');
                this.discussionService.startDiscussionCommunity(this.currentUserId, discussionTitle, userList, channelString, this.imageData).subscribe(
                    (response) => {
                        console.log('Community discussion started successfully');
                        this.retrieveAllDiscussions()
                    },
                    (error) => {
                        alert('Error starting Community discussion: ' + error);
                        console.error('Error starting Community discussion:', error);
                    }
                );
            }
        }
    }


    pmodifyDiscussion() {
        this.userDiscussion = [];

        const d = this.discussions.find((discussion) => discussion.id === this.currentDiscussion);
        const discussionUserIds = new Set(d.users.map((user) => user.id));

        this.existingUsers = d.users;
        this.existingUsers = this.existingUsers.filter((user) => user.id !== this.currentUserId);
        for (const user of this.existingUsers) {
            this.userDiscussion.push(user);
        }

        this.users = this.usersPre;
        this.users = this.users.filter((user) => !discussionUserIds.has(user.id));
        this.inputTitle = d.title;
        this.imageDatam = d.photo;

    }

    pmodifyCommunity() {
        this.userDiscussion = [];
        this.existingChannels = [];

        const d = this.communities.find((community) => community.id === this.currentCommunity);
        const discussionUserIds = new Set(d.users.map((user) => user.id));

        for (let ch of d.community) {
            var x: string = ch.title
            this.existingChannels.push(x);
        }

        this.existingUsers = d.users;
        this.existingUsers = this.existingUsers.filter((user) => user.id !== this.currentUserId);
        for (const user of this.existingUsers) {
            this.userDiscussion.push(user);
        }

        this.users = this.usersPre;
        this.users = this.users.filter((user) => !discussionUserIds.has(user.id));
        this.inputTitle = d.title;
        this.imageDatam = d.photo;

    }

    paddAdmins() {
        this.userDiscussion = [];

        if (this.currentCommunity == 0) {
        const d = this.discussions.find((discussion) => discussion.id === this.currentDiscussion);
       
        this.existingUsers = d.users;
        for (const user of this.existingUsers) {
          
            if (d.admins.find((userx) => userx.id === user.id)) {
                this.userDiscussion.push(user);
            }
        }
    
    } else {
            const d = this.communities.find((c) => c.id === this.currentCommunity);
      
            this.existingUsers = d.users;
            for (const user of this.existingUsers) {
              
                if (d.admins.find((userx) => userx.id === user.id)) {
                    this.userDiscussion.push(user);
                }
            }
        }

     
           




    }


    modifyDiscussion() {

        this.closeModalc();
        const userDiscussionIds = this.userDiscussion.map((u) => u.id);
        if (userDiscussionIds.length >= 1) {
            const discussionTitle = this.inputTitle;
            const userList = this.userDiscussion.map((u) => u.id).join('_');
            this.discussionService.modifyDiscussionGroup(this.currentDiscussion, this.currentUserId, discussionTitle, userList,  this.currentUserId, this.imageDatam).subscribe(
                (response) => {
                    console.log('Group discussion modified successfully');
                    this.retrieveAllDiscussions()
                },
                (error) => {
                    alert('Error modifying Group discussion: ' + error.error);
                    console.error('Error modifying Group discussion:', error);
                }
            );
        } else {
            alert('No users selected for modifying a discussion');
        }
    }


    modifyCommunity() {

        this.closeModald();
        const userDiscussionIds = this.userDiscussion.map((u) => u.id);
        const channelString = this.existingChannels.join('_');
        if (userDiscussionIds.length >= 1) {
            const discussionTitle = this.inputTitle;
            const userList = this.userDiscussion.map((u) => u.id).join('_');
            this.discussionService.modifyDiscussionCommunity(this.currentCommunity, this.currentUserId, discussionTitle, userList, channelString, this.currentUserId, this.imageData).subscribe(
                (response) => {
                    console.log('Community discussion modified successfully');
                    this.retrieveAllDiscussions()
                },
                (error) => {
                    alert('Error modifying Community discussion: ' + error.error);
                    console.error('Error modifying Community discussion:', error);
                }
            );
        } else {
            alert('No users selected for modifying a discussion');
        }
    }

    addAdmins() {

      
        this.closeModale();
        const userDiscussionIds = this.userDiscussion.map((u) => u.id);
        if (userDiscussionIds.length >= 1) {
            const userList = this.userDiscussion.map((u) => u.id).join('_');

            if (this.currentCommunity == 0) {

            this.discussionService.addAdminsToDiscussion(this.currentDiscussion, this.currentUserId, userList).subscribe(
                (response) => {
                    console.log('Admins added successfully');
                },
                (error) => {
                    alert('Error adding admins: ' + error.error);
                    console.error('Error adding admins:', error);
                }
            );

            } else {

                
            this.discussionService.addAdminsToDiscussion(this.currentCommunity, this.currentUserId, userList).subscribe(
                (response) => {
                    console.log('Admins added successfully');
                },
                (error) => {
                    alert('Error adding admins: ' + error.error);
                    console.error('Error adding admins:', error);
                }
            );

            }
        } else {
            alert('No users selected for adding admins');
        }
    }

    leaveDiscussion() {

        if (confirm('Are you sure to leave this Disucssion? (You can only rejoin when an admin reinvite you)')) {

            this.discussionService.leaveDiscussion(this.currentUserId, this.currentDiscussion).subscribe(
                (response) => {
                    console.log('Left discussion successfully');
                    this.retrieveAllDiscussions()
                },
                (error) => {
                    alert('Error leaving discussion: ' + error);
                    console.error('Error leaving discussion:', error);
                }
            );
        } 

    }

    deleteDiscussion() {

        if (confirm('Are you sure to delete this Disucssion?')) {

            if (this.currentCommunity == 0) {

                this.discussionService.deleteDiscussion(this.currentUserId, this.currentDiscussion).subscribe(
                    (response) => {
                        console.log('Success:', response);
                        this.retrieveAllDiscussions()
                    },
                    (error) => {
                        alert('Error deleting discussion: ' + error.error)
                        console.log(error);
                    }
                );

            } else {


                this.discussionService.deleteDiscussion(this.currentUserId, this.currentCommunity).subscribe(
                    (response) => {
                        this.retrieveAllCommunities()
                    },
                    (error) => {
                        alert('Error deleting discussion: ' + error.error)
                        alert(error)
                    }
                );

            }

        }
    }


    selectDM(): void {
        const id = this.currentUserId;
        localStorage.removeItem('currentCommunity');
        this.currentCommunity = 0;
        this.currentCommunityTitle = "";
        this.currentDiscussionTitle = "Select a Discussion";
        localStorage.setItem("currentCommunityTitle","");
        localStorage.setItem("currentDiscussionTitle","Select a Discussion");
        this.retrieveAllDiscussions();

    }

    selectDiscussion(id: number, title: string, type: string) {
        this._toggleOpened(true);
        this.currentDiscussionTitle = title;
        localStorage.setItem("currentDiscussionTitle",title) ;
        this.currentDiscussionType = type;
        localStorage.setItem("currentDiscussionType",type) ;
        this.retrieveAllMessages(id);

        if(this.forwardins) {
            this.forwarding();
        }

    }

    selectCommunity(id: number) {
        localStorage.setItem('currentCommunity', id.toString());
        this.currentCommunity = id


        const targetCommunity = this.communities.find(community => community.id === id);
        if (targetCommunity) {
            targetCommunity.community = targetCommunity.community.filter((x) => x.archived == false);
            this.discussions = targetCommunity.community

            this.currentCommunityTitle = targetCommunity.title + " : ";
            localStorage.setItem("currentCommunityTitle",targetCommunity.title + " : ");
            this.currentDiscussionTitle = "Select a Channel";
            localStorage.setItem("currentDiscussionTitle","Select a Channel");
        }


    }

    retrieveAllCommunities(): void {
        const id = this.currentUserId;
        this.discussionService.retrieveAllCommunities(id)
            .subscribe(communities => this.communities = communities);

    }

    retrieveAllDiscussions(): void {
        const id = this.currentUserId;
        this.discussionService.retrieveAllDiscussions(id)
            .subscribe(discussions => this.discussions = discussions);

    }

    retrieveAllMessages(id: number): void {
        const idx = id;
        this.messageService.retrieveAllMessages(idx)
            .subscribe(messages => this.messages = messages
            );

        const currentDate = new Date();
        this.formattedDate = this.datePipe.transform(currentDate, 'yyyy-MM-ddTHH:mm:ss.SSSSSS')!;
        localStorage.setItem('currentLocalDateTime', this.formattedDate);
        localStorage.setItem('currentDiscussion', idx.toString());
        this.currentDiscussion = idx;



    }


    retrieveRecentMessages() {
        const discussion = parseInt(localStorage.getItem("currentDiscussion")!);
        this.messageService.retrieveRecentMessages(discussion).subscribe(
            (newMessages: Message[]) => {
                this.messages = [...this.messages, ...newMessages];
                const currentDate = new Date();
                this.formattedDate = this.datePipe.transform(currentDate, 'yyyy-MM-ddTHH:mm:ss.SSSSSS')!;
                localStorage.setItem('currentLocalDateTime', this.formattedDate);
            },
            (error) => {
                console.error('Error fetching recent messages:', error);
            }
        );

        if (this.showPinsB == true) {
            this.messages = this.messages.filter(message => message.pinned);
        }
    }

    sendMessage() {

        const keywords = [
            "Hey chatgpt", "hi chatgpt", "hey gemini", "hi gemini", "hey copilot", "hi copilot", "chatgpt",
            "gemini", "copilot", "ai", "hey ai", "hi ai", "hi chatbot", "hey chatbot", "chatbot",
        ];

        const user = this.currentUserId;
        const discussion = parseInt(localStorage.getItem("currentDiscussion")!);
        this.messageService.sendMessage(user, discussion, this.sendMessageo).subscribe(response => {
            console.log('Message sent successfully');
            this.retrieveRecentMessages();
            this.sendMessageo = "";
        }, error => {
            console.error('Error sending message:', error);
        });

        const normalizedInput = this.sendMessageo.trim().toLowerCase();

        for (const keyword of keywords) {
            if (normalizedInput.startsWith(keyword.toLowerCase())) {
                this.askQuestion(this.sendMessageo);
            }
        }

    }

    onMessageClick(message: any) {
        this.currentMessage = message;
    }

    performAction(action: string) {
        switch (action) {
            case 'react':
                this.showFEmoji = !this.showFEmoji;
                break;
            case 'translate':
                this.showFTranslate = !this.showFTranslate;
                break;
            case 'close':
                this.currentMessage = null; // Hide the popup after action
                break;

        }
    }

    modifyMessage(id: number) {
        this.messageService.modifyMessage(id, "(Modified) " + this.editreplyMessageo).subscribe(response => {
            console.log('Message deleted successfully');
            this.retrieveAllMessages(parseInt(localStorage.getItem("currentDiscussion")!));
        }, error => {
            console.error('Error sending message:', error);
        });
        this.currentMessage = null;
    }

    deleteMessage(id: number) {
        this.messageService.deleteMessage(id).subscribe(response => {
            console.log('Message deleted successfully');
            this.retrieveAllMessages(parseInt(localStorage.getItem("currentDiscussion")!));
        }, error => {
            console.error('Error sending message:', error);
        });
        this.currentMessage = null;


    }

    replyMessage(message: number) {

        const user = this.currentUserId;
        const discussion = parseInt(localStorage.getItem("currentDiscussion")!);
        this.messageService.replyMessage(user, discussion, message, this.editreplyMessageo).subscribe(response => {
            console.log('Reply sent successfully');
            this.retrieveRecentMessages();
            this.currentMessage = null;
        }, error => {
            console.error('Error sending message:', error);
        });

    }

    reactMessage(message: number, reaction: string) {

        const user = this.currentUserId;
        const discussion = parseInt(localStorage.getItem("currentDiscussion")!);
        this.reactionService.addReaction(user, message, reaction).subscribe(response => {
            console.log('Reaction sent successfully');
            this.retrieveAllMessages(parseInt(localStorage.getItem("currentDiscussion")!));
            this.currentMessage = null;
        }, error => {
            console.error('Error reacting to message:', error);
        });

    }

    groupReactions(reactions: { reaction: string, archived: boolean }[]): { emoji: string, count: number }[] {
        // Filter out reactions that are archived
        const activeReactions = reactions.filter(reaction => !reaction.archived);

        const reactionMap = activeReactions.reduce((map, reaction) => {
            if (!map[reaction.reaction]) {
                map[reaction.reaction] = 0;
            }
            map[reaction.reaction]++;
            return map;
        }, {} as { [key: string]: number });

        return Object.entries(reactionMap).map(([emoji, count]) => ({
            emoji,
            count
        }));
    }


    pinMessage(id: number) {
        this.messageService.pinMessage(this.currentMessage.id).subscribe(response => {
            console.log('Message pinned successfully');
            this.retrieveAllMessages(parseInt(localStorage.getItem("currentDiscussion")!));
        }, error => {
            console.error('Error pinning message:', error);
        });
        this.currentMessage = null;
    }

    showPins() {
        this.showPinsB = !this.showPinsB
        this.retrieveAllMessages(parseInt(localStorage.getItem("currentDiscussion")!));
        if (this.showPinsB == true) {
            this.messages = this.messages.filter(message => message.pinned);
        }
    }

    askQuestion(question: string) {
        // Send the question to the backend
        this.messageService.askQuestion(question).subscribe((response: any) => {

            const textValue = "🤖:  " + response?.candidates?.[0]?.content?.parts?.[0]?.text;
            const user = this.currentUserId;
            const discussion = parseInt(localStorage.getItem("currentDiscussion")!);
            this.messageService.sendMessage(user, discussion, textValue).subscribe(response => {
                console.log('Message sent successfully');
                this.retrieveRecentMessages();
                this.sendMessageo = "";
            }, error => {
                console.error('Error sending message:', error);
            });

        }, error => {
            console.log("lol");
        });

        this.currentMessage = null;
    }

    translate() {
        // Send the question to the backend
        this.messageService.askQuestion('Translate this phrase to ' + this.selectedLanguage + ': ' + this.currentMessage.message).subscribe((response: any) => {
            this.translated = response?.candidates?.[0]?.content?.parts?.[0]?.text;

        }, error => {
            console.log("lol");
        });

    }

    pforwarding() {
        this.forwardins= true ;
        alert("Select a discussion to share the selected message.") ;
        this.forwardingo = this.currentMessage.message;
        this.currentMessage = ""
    }

    forwarding() {
        
        if (confirm('Are you sure to share this message to the discussion '+ this.currentDiscussionTitle +'?')) {
            this.sendMessageo =  "(forwarded) "+ this.forwardingo;
            this.sendMessage();
        } 
        this.forwardins = false ;
    }




}
