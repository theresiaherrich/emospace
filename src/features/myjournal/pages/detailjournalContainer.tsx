import Button from "../../../components/ui/button";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { type JournalAPI } from "../types/type";
import { getJournal, postJournal, updateJournal, deleteJournal } from "../../../services/journalservice";
import { Eraser } from "lucide-react";
import ConfirmModal from "../../../components/ui/confirmModal";

const DetailJournalContainer = () => {
  const { id } = useParams<{ id: string }>();
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [title, setTitle] = useState<JournalAPI["title"]>("");
  const [content, setContent] = useState<JournalAPI["content"]>("");
  const [journal, setJournal] = useState<JournalAPI>();
  const [isEditMode, setIsEditMode] = useState(id === "new");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      if (id !== "new") {
        try {
          const response = await getJournal();
          const journal = response.find((item: JournalAPI) => item.id === Number(id));
          setJournal(journal);
          setTitle(journal?.title || "");
          setContent(journal?.content || "");
          setPreviewUrl(journal?.image_url || null);
        } catch (err) {
          console.error("Failed to fetch journals", err);
        }
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    if (!journal && id !== "new") {
      console.log(Error);
    }
  }, [journal, id, navigate]);

  const handleSave = async () => {
    if (!title || !content) return;

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    if (image) {
      formData.append("image", image);
    }

    try {
      if (id === "new") {
        await postJournal(formData);
      } else {
        await updateJournal(Number(id), formData);
      }
      setIsEditMode(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      console.error("Failed to save journal", err);
    }
  };

  const MAX_SIZE_MB = 5;
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.size < MAX_SIZE_MB * 1024 * 1024) {
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
    else {
      alert('File terlalu besar! Maksimal 5MB.');
      return;
    }
  };

  const handleDelete = async () => {
    try {
      await deleteJournal(Number(id));
      navigate("/my-journal");
    } catch (err) {
      console.error("Failed to delete journal", err);
    }
  };

  const today =
    journal?.date ||
    new Date().toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });

  return (
    <div className="bg-[#F3F3F3] bg-cover min-h-screen w-full relative">
      <img src="/assets/gradient-purple.svg" alt="" className="absolute -top-10 md:-top-36 left-1/2 transform -translate-x-1/2 w-[800px] " />
      <img src="/assets/gradient-blue.svg" alt="" className="-top-80 right-1/4 absolute w-[400px] max-w-full -translate-x-1/2" />
      <img src="/assets/gradient-pink.svg" alt="" className="absolute bottom-0 w-full right-0 h-72 object-top object-cover z-0" />
      <div className="pt-36 px-4 sm:px-10 md:px-20 pb-24 flex flex-col min-h-screen relative z-10">
        <div className="mb-20 relative text-center">
          <img src="/assets/bintang-1.svg" alt="" className="absolute top-[-70%] left-[37%] transform -translate-x-[150%] w-6 sm:w-8" />
          <h1 className="font-spartan text-2xl sm:text-3xl font-bold text-[#1C1C1C]">
            My<span className="text-[#633796]"> Journal</span>
          </h1>
          <img src="/assets/bintang-1.svg" alt="" className="absolute bottom-[-65%] right-[36%] transform translate-x-[150%] w-5 sm:w-6" />
        </div>
        <div>
          <div className="relative w-full mb-5">
            {!isEditMode ? (
              <img
                src={previewUrl || "/assets/journal-photo.svg"}
                alt="Upload"
                className="rounded-lg object-cover object-center w-full h-48"
              />
            ) : (
              <>
                <input
                  type="file"
                  accept="image/*"
                  id="upload-image"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <label htmlFor="upload-image">
                  <img
                    src={previewUrl || "/assets/journal-photo.svg"}
                    alt="Upload"
                    className="rounded-lg object-cover object-center w-full h-48 hover:opacity-80 transition duration-200 cursor-pointer"
                  />
                </label>
              </>
            )}
          </div>

          <div className="flex flex-col p-4 gap-8">
            <div className="flex justify-between">
              <div className="flex flex-col gap-1 justify-start">
                {!isEditMode ? (
                  <h1 className="font-bold font-spartan text-2xl">{title}</h1>
                ) : (
                  <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    type="text"
                    placeholder="Enter your journal title"
                    className="font-bold font-spartan text-2xl bg-transparent focus:outline-none placeholder:text-black"
                  />
                )}
                <p className="font-spartan font-medium text-opacity-60 text-[#1C1C1C]">{today}</p>
              </div>
              <div className="flex justify-end">
                {!isEditMode && (
                  <button>
                    <Eraser
                      className="w-6 h-6 text-[#1C1C1C]"
                      onClick={() => setIsModalOpen(true)}
                    />
                  </button>
                )}
              </div>
            </div>

            {!isEditMode ? (
              <p className="font-spartan text-xl min-h-36 whitespace-pre-line">{content}</p>
            ) : (
              <div className="border border-[#29262A] rounded-lg px-5 py-3 min-h-36">
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Type how's your day..."
                  className="bg-transparent font-spartan focus:outline-none w-full resize-none overflow-hidden scrollbar-hide text-xl min-h-36"
                />
              </div>
            )}
          </div>

          <div className="mt-24 flex gap-3 justify-end">
            <Button
              variant="secondary"
              className="rounded-xl py-3 px-10"
              onClick={() => navigate("/my-journal")}
            >
              Back
            </Button>
            {isEditMode ? (
              <Button
                variant="primary"
                className="rounded-xl py-3 px-10"
                onClick={handleSave}
              >
                Save
              </Button>
            ) : (
              <Button
                variant="primary"
                className="rounded-xl py-3 px-10"
                onClick={() => setIsEditMode(true)}
              >
                Update
              </Button>
            )}
          </div>
        </div>
      </div>

      {isModalOpen && (
        <ConfirmModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onConfirm={handleDelete}
          message="Are you sure want to delete this journal?"
        />
      )}
    </div>
  );
};

export default DetailJournalContainer;
