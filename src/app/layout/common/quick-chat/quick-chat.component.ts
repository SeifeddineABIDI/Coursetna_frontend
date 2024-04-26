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
    messages: Message[] = [];

    sendMessageo!: string;
    editreplyMessageo!: string;

    imageData: string | ArrayBuffer | null = null;

    intervalId: any;

    formattedDate: string | undefined;

    currentUser: number | null = parseInt(localStorage.getItem('currentUser')!);
    currentDiscussion: number | null = parseInt(localStorage.getItem('currentDiscussion')!);
    currentCommunity: number | null = parseInt(localStorage.getItem('currentCommunity')!);
    currentDiscussionTitle!: string
    currentMessage: any = null;

    showModala: boolean = false;
    showModalb: boolean = false;

    showFEmoji: boolean = false;
    showFTranslate: boolean = false;
    showPinsB: boolean = false;

    inputTitle: string = '';
    channels: string[] = [''];
    userDiscussion: any[] = [];

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


        this.users = [
            {
                id: 2,
                nom: 'Yassin',
                prenom: 'Mezni',
                email: 'y@gmail.com',
                password: 'y',
                role: TypeUser.Admin,
                photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Paramecium.jpg/640px-Paramecium.jpg'
            },
            {
                id: 3,
                nom: 'Abidi',
                prenom: 'Seifeddine',
                email: 'x@gmail.com',
                password: 'x',
                role: TypeUser.Admin,
                photo: 'https://upload.wikimedia.org/wikipedia/commons/9/99/Elon_Musk_Colorado_2022_%28cropped2%29.jpg'
            },
            {
                id: 4,
                nom: 'Ghofran',
                prenom: 'Rahmoni',
                email: 'w@gmail.com',
                password: 'w',
                role: TypeUser.Admin,
                photo: 'https://i.pinimg.com/736x/f3/1e/a0/f31ea05d300cfe3aebfc0576d0faba10.jpg'
            },
        ];


        this.currentDiscussionTitle = "Discussions";

        this.retrieveAllCommunities();
        if (localStorage.getItem('currentCommunity')) {
            this.selectCommunity(parseInt(localStorage.getItem('currentCommunity')!))
            this.currentCommunity = parseInt(localStorage.getItem("currentCommunity")!)
        } else {
            this.currentCommunity = 0;
            this.retrieveAllDiscussions();
        }
        if (localStorage.getItem('currentDiscussion')) {
            this.retrieveAllMessages(parseInt(localStorage.getItem('currentDiscussion')!));
            this.currentDiscussion = parseInt(localStorage.getItem("currentDiscussion")!)
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

    // Function to open the modal
    openModala() {
        this.showModala = true;
    }

    openModalb() {
        this.showModalb = true;
    }

    addChannel() {
        this.channels.push('');
    }

    removeChannel() {
        if (this.channels.length > 1) {
            this.channels.pop();
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
            case 'share':
                console.log('Share action for:', this.currentMessage);
                break;
            case 'forward':
                console.log('Forward action for:', this.currentMessage);
                this.currentMessage = null; // Hide the popup after action
                break;

        }

    }




    startDiscussion() {

        this.closeModala();
        const userDiscussionIds = this.userDiscussion.map((u) => u.id);
        if (userDiscussionIds.length === 1) {
            // Start a Duo discussion with the single user
            const otherUserId = userDiscussionIds[0];
            this.discussionService.startDiscussionDuo(this.currentUser, otherUserId).subscribe(
                (response) => {
                    console.log('Duo discussion started successfully');
                    // Optionally, call a function to refresh the list of discussions
                },
                (error) => {
                    alert('Error starting Group discussion: ' + error);
                    console.error('Error starting Duo discussion:', error);
                }
            );
        } else if (userDiscussionIds.length > 1) {
            const discussionTitle = this.inputTitle;
            const userList = this.userDiscussion.map((u) => u.id).join('_');
            this.discussionService.startDiscussionGroup(this.currentUser, discussionTitle, userList, this.imageData).subscribe(
                (response) => {
                    console.log('Group discussion started successfully');
                    this.retrieveAllDiscussions()
                },
                (error) => {
                    alert('Error starting Group discussion: ' + error);
                    console.error('Error starting Duo discussion:', error);
                }
            );
        } else {
            alert('No users selected for starting a discussion');
        }
    }


    startCommunity() {
        this.closeModalb();
        const channelString = this.channels.join('_');
        const userDiscussionIds = this.userDiscussion.map((u) => u.id);
        const discussionTitle = this.inputTitle;
        if (userDiscussionIds.length === 0) {
            this.discussionService.startDiscussionCommunity(this.currentUser, discussionTitle, "", channelString, this.imageData).subscribe(
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
            this.discussionService.startDiscussionCommunity(this.currentUser, discussionTitle, userList, channelString, this.imageData).subscribe(
                (response) => {
                    console.log('Group discussion started successfully');
                    this.retrieveAllDiscussions()
                },
                (error) => {
                    alert('Error starting Community discussion: ' + error);
                    console.error('Error starting Community discussion:', error);
                }
            );
        }
    }

    // Function to close the modal
    closeModala() {
        this.showModala = false;
    }

    closeModalb() {
        this.showModalb = false;
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
                    }
                };

                // Set the source of the image to the data read from the file
                originalImage.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    }


    selectDM(): void {
        const id = this.currentUser;
        localStorage.removeItem('currentCommunity');
        this.currentCommunity = 0;
        this.retrieveAllDiscussions();

    }

    selectCommunity(id: number): void {
        localStorage.setItem('currentCommunity', id.toString());
        this.currentCommunity = id
        const targetCommunity = this.communities.find(community => community.id === id);
        if (targetCommunity) {
            this.discussions = targetCommunity.community
        }
    }

    retrieveAllDiscussions(): void {
        const id = this.currentUser;
        this.discussionService.retrieveAllDiscussions(id)
            .subscribe(discussions => this.discussions = discussions);

    }

    retrieveAllCommunities(): void {
        const id = this.currentUser;
        this.discussionService.retrieveAllCommunities(id)
            .subscribe(communities => this.communities = communities);

    }

    retrieveAllMessages(id: number): void {
        const idx = id;
        this._toggleOpened(true);
        this.messageService.retrieveAllMessages(idx)
            .subscribe(messages => this.messages = messages
            );

        const currentDate = new Date();
        this.formattedDate = this.datePipe.transform(currentDate, 'yyyy-MM-ddTHH:mm:ss.SSSSSS')!;
        localStorage.setItem('currentLocalDateTime', this.formattedDate);
        localStorage.setItem('currentDiscussion', idx.toString());
        this.currentDiscussion = idx;



    }

    selectDiscussion(id: number, title: string): void {
        this.currentDiscussionTitle = title;
        this.retrieveAllMessages(id);
    }

    sendMessage() {

        const keywords = [
            "Hey chatgpt",
            "hi chatgpt",
            "hey gemini",
            "hi gemini",
            "hey copilot",
            "hi copilot",
            "chatgpt",
            "gemini",
            "copilot",
            "ai",
            "hey ai",
            "hi ai",
        ];



        const user = this.currentUser;
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
             this.askQuestion(this.sendMessageo) ;
            }
          }

    }

    replyMessage(message: number) {

        const user = this.currentUser;
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

        const user = this.currentUser;
        const discussion = parseInt(localStorage.getItem("currentDiscussion")!);
        this.reactionService.addReaction(user, message, reaction).subscribe(response => {
            console.log('Reaction sent successfully');
            this.retrieveAllMessages(parseInt(localStorage.getItem("currentDiscussion")!));
            this.currentMessage = null;
        }, error => {
            console.error('Error reacting to message:', error);
        });

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

    addUserToDiscussion() {
        const checkbox1 = document.getElementById('checkbox1') as HTMLInputElement;
        const checkbox2 = document.getElementById('checkbox2') as HTMLInputElement;

        var numbers = [];

        // Check if checkbox1 is selected and add 2 to the list
        if (checkbox1.checked) {
            numbers.push(2);
        }

        // Check if checkbox2 is selected and add 3 to the list
        if (checkbox2.checked) {
            numbers.push(3);
        }


        const targetDiscussion = this.discussions.find(discussion => discussion.id === parseInt(localStorage.getItem("currentDiscussion")!));
        if (targetDiscussion) {

            if (targetDiscussion.typeDiscussion == "Group") {

                this.discussionService.addUserToDiscussion(parseInt(localStorage.getItem("currentDiscussion")!), numbers).subscribe(response => {
                    console.log('Users added to Discussion successfully');
                    this.retrieveAllDiscussions();
                }, error => {
                    console.error('Error starting discussion:', error);
                });

            }
            if (targetDiscussion.typeDiscussion == "CommunitySlave") {

                this.discussionService.addUserToDiscussion(parseInt(localStorage.getItem("currentCommunity")!), numbers).subscribe(response => {
                    console.log('Users added to Discussion successfully');
                    this.retrieveAllDiscussions();
                }, error => {
                    console.error('Error starting discussion:', error);
                });

            }
        }



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
            const user = this.currentUser;
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


}
