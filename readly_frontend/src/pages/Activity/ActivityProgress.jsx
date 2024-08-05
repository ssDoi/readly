import { useState, useEffect } from "react";
import axios from "axios";
import GoButton from "../../components/GoButton/GoButton.jsx";
import CreateReview from "../../components/Review/CreateReview.jsx";
import Search from "../../components/Search.jsx";
import useUserStore from "../../store/userStore.js";
import GroupProgressBar from "../../components/ProgressBar/Group/GroupProgressBar.jsx";
import GroupCurrentPageModal from "../../components/ProgressBar/Group/GroupCurrentPageModal.jsx";

const getLayoutClasses = (memberCount) => {
  if (memberCount <= 4) {
    return {
      container: "w-3/5",
      grid: "grid-cols-1",
      padding: "",
    };
  } else if (memberCount <= 8) {
    return {
      container: "w-full",
      grid: "grid-cols-2",
      padding: "pr-0",
    };
  } else {
    return {
      container: "w-full",
      grid: "grid-cols-3",
      padding: "pr-0",
    };
  }
};

export default function ActivityProgress({ groupId }) {
  const [bookInfo, setBookInfo] = useState(null);
  const [readBooks, setReadBooks] = useState([]);
  const [reviewInput, setReviewInput] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [searchModalIsOpen, setSearchModalIsOpen] = useState(false);
  const [error, setError] = useState(null);
  const [selectedMemberId, setSelectedMemberId] = useState(null);
  const [currentPageModalIsOpen, setCurrentPageModalIsOpen] = useState(false);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
  const { token, user } = useUserStore();

  const layoutClasses = getLayoutClasses(readBooks.length);

  useEffect(() => {
    const fetchGroupData = async () => {
      if (!groupId) {
        console.log("GroupId is not available yet");
        return;
      }

      setError(null);
      try {
        console.log(`Fetching data for groupId: ${groupId}`);
        const response = await axios.get(
          `http://localhost:8080/api/group/read-books/${groupId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log("API Response:", response.data);
        setBookInfo(response.data.bookInfo);
        setReadBooks(response.data.readBooks);
      } catch (error) {
        console.error("Error fetching group data:", error);
        if (error.response) {
          console.error("Response data:", error.response.data);
          console.error("Response status:", error.response.status);
          console.error("Response headers:", error.response.headers);
        } else if (error.request) {
          console.error("No response received:", error.request);
        } else {
          console.error("Error setting up request:", error.message);
        }
        setError(
          "데이터를 불러오는 데 실패했습니다. 잠시 후 다시 시도해주세요."
        );
      }
    };

    fetchGroupData();
  }, [groupId, token]);

  const updateCurrentPage = async (memberId, newPage) => {
    if (user.id !== memberId) {
      console.log("You can only update your own progress.");
      return;
    }

    try {
      await axios.put(`http://localhost:8080/api/group/update-page`, {
        groupId,
        memberId,
        currentPage: newPage,
      });

      setReadBooks((prevReadBooks) =>
        prevReadBooks.map((book) =>
          book.member_id === memberId
            ? { ...book, current_page: newPage }
            : book
        )
      );
    } catch (error) {
      console.error("Error updating current page:", error);
    }
  };

  const handleReviewInputChange = (e) => {
    setReviewInput(e.target.value);
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const openCurrentPageModal = (memberId, event) => {
    if (memberId === user.id) {
      const rect = event.target.getBoundingClientRect();
      setModalPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX
      });
      setSelectedMemberId(memberId);
      setCurrentPageModalIsOpen(true);
    }
  };

  const closeCurrentPageModal = () => {
    setSelectedMemberId(null);
    setCurrentPageModalIsOpen(false);
  };

  const handleSaveCurrentPage = async (newPage) => {
    await updateCurrentPage(selectedMemberId, parseInt(newPage, 10));
    closeCurrentPageModal();
  };

  const handleCreateReview = async () => {
    if (reviewInput.trim()) {
      try {
        await axios.post(`http://localhost:8080/api/group/add-review`, {
          groupId,
          bookId: bookInfo.book_id,
          review: reviewInput,
        });

        setReviewInput("");
        closeModal();
      } catch (error) {
        console.error("Error creating review:", error);
      }
    }
  };

  const openSearchModal = () => {
    setSearchModalIsOpen(true);
  };

  const closeSearchModal = () => {
    setSearchModalIsOpen(false);
  };

  const changeBook = async (newBook) => {
    try {
      await axios.put(`http://localhost:8080/api/group/change-book`, {
        groupId,
        bookId: newBook.id,
        title: newBook.title,
        author: newBook.author,
        totalPages: newBook.totalPages || 100,
      });

      setBookInfo({
        book_id: newBook.id,
        book_title: newBook.title,
        book_author: newBook.author,
        book_totalPage: newBook.totalPages || 100,
      });
    } catch (error) {
      console.error("Error changing book:", error);
    }
    closeSearchModal();
  };

  if (error) return <div className="text-red-500">{error}</div>;
  if (!bookInfo) return <div>Loading...</div>;

  return (
    <>
      <h2 className="font-bold text-xl mb-1 mt-5">
        현재 <span className="text-custom-highlight">읽고 있는</span> 책
      </h2>
      <div className={`container mx-auto p-4 ${layoutClasses.padding}`}>
        <div
          className={`bg-white p-4 rounded-lg mb-4 flex z-100 ${layoutClasses.container}`}
        >
          <div>
            <img
              src={`http://localhost:8080/api/books/cover/${bookInfo.book_id}`}
              alt={bookInfo.book_title}
              className="w-[8rem] h-[12rem] mr-4"
            />
            <div className="mt-4 flex justify-start">
              <GoButton text="책 변경하기" onClick={openSearchModal} />
            </div>
          </div>
          <div className={`flex-1 ml-4 ${readBooks.length > 4 ? "pr-4" : ""}`}>
            <h3 className="font-bold mb-2">{bookInfo.book_title}</h3>
            <p className="mb-4">{bookInfo.book_author}</p>
            <div className={`grid ${layoutClasses.grid} gap-4`}>
              {readBooks.map((book) => (
                <div key={book.member_id} className="flex items-center">
                  <p
                    className={`mr-4 w-20 truncate ${
                      book.member_id === user.id
                        ? "text-[#000000] cursor-pointer font-bold"
                        : "text-[#dadada]"
                    }`}
                    onClick={(event) => openCurrentPageModal(book.member_id, event)}
                  >
                    {book.member_info.member_name}
                  </p>
                  <div className="flex-1">
                    <GroupProgressBar
                      currentPage={book.current_page}
                      totalPages={bookInfo.book_totalPage}
                      onUpdateCurrentPage={(newPage) =>
                        updateCurrentPage(book.member_id, newPage)
                      }
                      isEditable={book.member_id === user.id}
                      memberName={book.member_info.member_name}
                      isCurrentUser={book.member_id === user.id}
                      openModal={(event) => openCurrentPageModal(book.member_id, event)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <h2 className="font-bold mb-2 text-xl">
          <span className="text-custom-highlight">책 </span>에 대한{" "}
          <span className="text-custom-highlight">한줄평</span>을 남기고
          싶으신가요?
        </h2>
        <div className="flex items-center gap-2">
          <input
            type="text"
            className="w-[30rem] mt-1 p-2 border rounded-lg"
            placeholder="한줄평을 입력해주세요"
            value={reviewInput}
            onChange={handleReviewInputChange}
          />
          <GoButton text="생성" onClick={openModal} />
        </div>
      </div>

      <GroupCurrentPageModal 
        isOpen={currentPageModalIsOpen}
        onRequestClose={closeCurrentPageModal}
        onSave={handleSaveCurrentPage}
        position={modalPosition}
        memberName={readBooks.find(book => book.member_id === selectedMemberId)?.member_info.member_name || ''}
      />

      <CreateReview
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        book={bookInfo}
        reviewText={reviewInput}
        onReviewSubmit={handleCreateReview}
      />

      <Search
        isOpen={searchModalIsOpen}
        onRequestClose={closeSearchModal}
        onBookSelect={changeBook}
      />
    </>
  );
}
