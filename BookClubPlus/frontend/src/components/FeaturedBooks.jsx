import BookCard from './BookCard'; // Adjust the path as necessary

const featuredBooks = [
    { 
        id: "xFr92V2k3PIC", 
        volumeInfo: {
            title: "The Fellowship of the Ring", 
            authors: ["J.R.R. Tolkien"], 
            imageLinks: {
                thumbnail: "https://books.google.com/books/content?id=xFr92V2k3PIC&printsec=frontcover&img=1&zoom=1&edge=curl&imgtk=AFLRE73U6TCHTq_1mMjjqgMOVrqXj2xHm2av2c1wXS2XbA-FuZoankMFE0jFm7gROQ8IUobqfyTujRC-y19rcjdC83hg4TqVJ1R_p0cEFxrFkoSnAxP16hzIN4DNyvB2yvgw8RuEEHc-&source=gbs_api"
            }
        }
    },
    { 
        id: "OHclhBVv-X4C", 
        volumeInfo: {
            title: "The Way of Kings", 
            authors: ["Brandon Sanderson"], 
            imageLinks: {
                thumbnail: "https://books.google.com/books/content?id=OHclhBVv-X4C&printsec=frontcover&img=1&zoom=1&edge=curl&imgtk=AFLRE73U6TCHTq_1mMjjqgMOVrqXj2xHm2av2c1wXS2XbA-FuZoankMFE0jFm7gROQ8IUobqfyTujRC-y19rcjdC83hg4TqVJ1R_p0cEFxrFkoSnAxP16hzIN4DNyvB2yvgw8RuEEHc-&source=gbs_api"
            }
        }
    },
    { 
        id: "oF6LDQAAQBAJ", 
        volumeInfo: {
            title: "Death Masks", 
            authors: ["Jim Butcher"], 
            imageLinks: {
                thumbnail: "https://books.google.com/books/content?id=oF6LDQAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&imgtk=AFLRE73U6TCHTq_1mMjjqgMOVrqXj2xHm2av2c1wXS2XbA-FuZoankMFE0jFm7gROQ8IUobqfyTujRC-y19rcjdC83hg4TqVJ1R_p0cEFxrFkoSnAxP16hzIN4DNyvB2yvgw8RuEEHc-&source=gbs_api"
            }
        }
    },
    { 
        id: "xcBR6LCcsd4C", 
        volumeInfo: {
            title: "11/22/63", 
            authors: ["Stephen King"], 
            imageLinks: {
                thumbnail: "https://books.google.com/books/content?id=xcBR6LCcsd4C&printsec=frontcover&img=1&zoom=1&edge=curl&imgtk=AFLRE73U6TCHTq_1mMjjqgMOVrqXj2xHm2av2c1wXS2XbA-FuZoankMFE0jFm7gROQ8IUobqfyTujRC-y19rcjdC83hg4TqVJ1R_p0cEFxrFkoSnAxP16hzIN4DNyvB2yvgw8RuEEHc-&source=gbs_api"
            }
        }
    },
];

const FeaturedBooks = () => (
    <div>
        <h2 className="font-bold text-2xl text-center mt-8">Featured Books</h2>
        <div className="flex justify-center flex-wrap">
            {featuredBooks.map((book, index) => (
                <div key={index} className="m-4">
                    <BookCard book={book.volumeInfo} bookId={book.id} />
                </div>
            ))}
        </div>
    </div>
);

export default FeaturedBooks;