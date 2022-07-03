import { Injectable } from '@nestjs/common';
import { PrismaOpsService } from '../prisma-ops/prisma-ops.service';
import { EditBookmarkDto, NewBookmarkDto } from './dto/bookmark.dto';

@Injectable()
export class BookmarkService {
    constructor(private prismaOpsService: PrismaOpsService ){}

    getBookmarks(userId: number){
        
    };

    getBookmarkById(userId: number, bookmarkId: number){
        
    };

    createBookmark(userId: number, body: NewBookmarkDto){
        
    };

    editBookmarkById(userId: number, bookmarkId: number, body: EditBookmarkDto){
        
    };

    deleteBookmarkById(userId: number, bookmarkId: number){
        
    };
};

// Stopped at 3:26:18.
