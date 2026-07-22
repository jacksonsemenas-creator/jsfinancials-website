"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Tab = "report" | "course" | "research";

interface Report {
  id: string;
  title: string;
  report_date: string;
  file_path: string;
}

interface CourseMaterial {
  id: string;
  course: string;
  title: string;
  module_number: number | null;
  description: string | null;
  file_path: string;
}

interface ResearchResource {
  id: string;
  title: string;
  description: string | null;
  resource_type: string;
  file_path: string | null;
  video_url: string | null;
}

interface AdminUploadProps {
  existingReports: Report[];
  existingCourses: CourseMaterial[];
  existingResearch: ResearchResource[];
}

export default function AdminUpload({
  existingReports,
  existingCourses,
  existingResearch,
}: AdminUploadProps) {
  const [activeTab, setActiveTab] = useState<Tab>("report");

  const tabs: { key: Tab; label: string }[] = [
    { key: "report", label: "Daily Reports" },
    { key: "course", label: "Course Materials" },
    { key: "research", label: "Research" },
  ];

  return (
    <div className="mt-8">
      <div className="flex gap-2 border-b border-gold/10 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2.5 text-sm font-medium transition-colors ${
              activeTab === tab.key
                ? "text-gold border-b-2 border-gold"
                : "text-gray-500 hover:text-gray-300"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "report" && <ReportSection reports={existingReports} />}
      {activeTab === "course" && <CourseSection courses={existingCourses} />}
      {activeTab === "research" && (
        <ResearchSection resources={existingResearch} />
      )}
    </div>
  );
}

// ── Delete helper ──

async function deleteItem(
  table: string,
  id: string,
  filePath: string | null,
) {
  const res = await fetch("/api/admin/delete-content", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ table, id, filePath }),
  });
  return res.ok;
}

function DeleteButton({
  table,
  id,
  filePath,
  label,
}: {
  table: string;
  id: string;
  filePath: string | null;
  label: string;
}) {
  const router = useRouter();
  const [confirming, setConfirming] = useState(false);
  const [deleting, setDeleting] = useState(false);

  async function handleDelete() {
    setDeleting(true);
    const ok = await deleteItem(table, id, filePath);
    if (ok) {
      router.refresh();
    } else {
      setDeleting(false);
      setConfirming(false);
    }
  }

  if (confirming) {
    return (
      <div className="flex items-center gap-2">
        <button
          onClick={handleDelete}
          disabled={deleting}
          className="text-xs px-2.5 py-1 rounded bg-red-700 text-white hover:bg-red-600 transition-colors disabled:opacity-50"
        >
          {deleting ? "Deleting..." : "Confirm"}
        </button>
        <button
          onClick={() => setConfirming(false)}
          className="text-xs px-2.5 py-1 rounded text-gray-400 hover:text-white transition-colors"
        >
          Cancel
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => setConfirming(true)}
      className="text-xs text-gray-500 hover:text-red-400 transition-colors"
      title={`Delete ${label}`}
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
      </svg>
    </button>
  );
}

// ── Reports ──

function ReportSection({ reports }: { reports: Report[] }) {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<"idle" | "uploading" | "done" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!file) return;

    setStatus("uploading");
    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);
    formData.append("date", date);

    const res = await fetch("/api/admin/upload-report", { method: "POST", body: formData });
    const data = await res.json();

    if (res.ok) {
      setStatus("done");
      setMessage("Report uploaded successfully.");
      setTitle("");
      setFile(null);
      router.refresh();
    } else {
      setStatus("error");
      setMessage(data.error || "Upload failed.");
    }
  }

  return (
    <div className="space-y-8">
      <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
        <h3 className="text-white text-sm font-medium">Upload New Report</h3>
        <StatusMessage status={status} message={message} />

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1.5">Report Title</label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Daily Macro Report"
            className="w-full rounded-lg border border-gold/20 bg-navy px-4 py-2.5 text-white placeholder-gray-500 focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1.5">Report Date</label>
          <input
            type="date"
            required
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full rounded-lg border border-gold/20 bg-navy px-4 py-2.5 text-white focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-colors [color-scheme:dark]"
          />
        </div>

        <FileInput file={file} onFileChange={setFile} accept=".pdf" />

        <button
          type="submit"
          disabled={status === "uploading" || !file}
          className="rounded-lg bg-gold px-4 py-2.5 text-sm font-semibold text-navy tracking-wide uppercase hover:bg-gold-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === "uploading" ? "Uploading..." : "Upload Report"}
        </button>
      </form>

      {reports.length > 0 && (
        <div>
          <h3 className="text-white text-sm font-medium mb-3">
            Existing Reports ({reports.length})
          </h3>
          <div className="space-y-2">
            {reports.map((r) => (
              <div
                key={r.id}
                className="flex items-center justify-between border border-gold/10 rounded-lg px-4 py-3 bg-navy-light"
              >
                <div>
                  <p className="text-white text-sm">{r.title}</p>
                  <p className="text-gray-500 text-xs mt-0.5">
                    {new Date(r.report_date + "T00:00:00").toLocaleDateString("en-AU", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <DeleteButton
                  table="daily_reports"
                  id={r.id}
                  filePath={r.file_path}
                  label={r.title}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ── Courses ──

function CourseSection({ courses }: { courses: CourseMaterial[] }) {
  const router = useRouter();
  const [course, setCourse] = useState<"macro_course" | "prediction_markets">("macro_course");
  const [title, setTitle] = useState("");
  const [moduleNumber, setModuleNumber] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<"idle" | "uploading" | "done" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!file) return;

    setStatus("uploading");
    const formData = new FormData();
    formData.append("file", file);
    formData.append("course", course);
    formData.append("title", title);
    formData.append("moduleNumber", moduleNumber);
    formData.append("description", description);

    const res = await fetch("/api/admin/upload-course", { method: "POST", body: formData });
    const data = await res.json();

    if (res.ok) {
      setStatus("done");
      setMessage("Course material uploaded successfully.");
      setTitle("");
      setModuleNumber("");
      setDescription("");
      setFile(null);
      router.refresh();
    } else {
      setStatus("error");
      setMessage(data.error || "Upload failed.");
    }
  }

  const macroCourses = courses.filter((c) => c.course === "macro_course");
  const predictionCourses = courses.filter((c) => c.course === "prediction_markets");

  return (
    <div className="space-y-8">
      <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
        <h3 className="text-white text-sm font-medium">Upload Course Material</h3>
        <StatusMessage status={status} message={message} />

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1.5">Course</label>
          <select
            value={course}
            onChange={(e) => setCourse(e.target.value as "macro_course" | "prediction_markets")}
            className="w-full rounded-lg border border-gold/20 bg-navy px-4 py-2.5 text-white focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-colors"
          >
            <option value="macro_course">Macroeconomics Course</option>
            <option value="prediction_markets">Prediction Markets Course</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1.5">Title</label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Module 1: Foundations of Macroeconomics"
            className="w-full rounded-lg border border-gold/20 bg-navy px-4 py-2.5 text-white placeholder-gray-500 focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-colors"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">
              Module Number (optional)
            </label>
            <input
              type="number"
              min="0"
              value={moduleNumber}
              onChange={(e) => setModuleNumber(e.target.value)}
              placeholder="e.g. 1"
              className="w-full rounded-lg border border-gold/20 bg-navy px-4 py-2.5 text-white placeholder-gray-500 focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-colors"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1.5">
            Description (optional)
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={2}
            placeholder="Brief description of this material"
            className="w-full rounded-lg border border-gold/20 bg-navy px-4 py-2.5 text-white placeholder-gray-500 focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-colors resize-none"
          />
        </div>

        <FileInput file={file} onFileChange={setFile} accept=".pdf" />

        <button
          type="submit"
          disabled={status === "uploading" || !file}
          className="rounded-lg bg-gold px-4 py-2.5 text-sm font-semibold text-navy tracking-wide uppercase hover:bg-gold-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === "uploading" ? "Uploading..." : "Upload Material"}
        </button>
      </form>

      {macroCourses.length > 0 && (
        <ContentList
          title={`Macroeconomics Course (${macroCourses.length})`}
          items={macroCourses}
          table="course_materials"
        />
      )}

      {predictionCourses.length > 0 && (
        <ContentList
          title={`Prediction Markets Course (${predictionCourses.length})`}
          items={predictionCourses}
          table="course_materials"
        />
      )}
    </div>
  );
}

// ── Research ──

function ResearchSection({ resources }: { resources: ResearchResource[] }) {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [resourceType, setResourceType] = useState<"pdf" | "video">("pdf");
  const [file, setFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState("");
  const [status, setStatus] = useState<"idle" | "uploading" | "done" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setStatus("uploading");
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("resourceType", resourceType);

    if (resourceType === "pdf") {
      if (!file) return;
      formData.append("file", file);
    } else {
      formData.append("videoUrl", videoUrl);
    }

    const res = await fetch("/api/admin/upload-research", { method: "POST", body: formData });
    const data = await res.json();

    if (res.ok) {
      setStatus("done");
      setMessage("Resource uploaded successfully.");
      setTitle("");
      setDescription("");
      setFile(null);
      setVideoUrl("");
      router.refresh();
    } else {
      setStatus("error");
      setMessage(data.error || "Upload failed.");
    }
  }

  return (
    <div className="space-y-8">
      <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
        <h3 className="text-white text-sm font-medium">Upload Research Resource</h3>
        <StatusMessage status={status} message={message} />

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1.5">Type</label>
          <select
            value={resourceType}
            onChange={(e) => setResourceType(e.target.value as "pdf" | "video")}
            className="w-full rounded-lg border border-gold/20 bg-navy px-4 py-2.5 text-white focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-colors"
          >
            <option value="pdf">PDF Document</option>
            <option value="video">Video Link</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1.5">Title</label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. BTC Macro Correlation Analysis"
            className="w-full rounded-lg border border-gold/20 bg-navy px-4 py-2.5 text-white placeholder-gray-500 focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1.5">
            Description (optional)
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={2}
            placeholder="Brief description"
            className="w-full rounded-lg border border-gold/20 bg-navy px-4 py-2.5 text-white placeholder-gray-500 focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-colors resize-none"
          />
        </div>

        {resourceType === "pdf" ? (
          <FileInput file={file} onFileChange={setFile} accept=".pdf" />
        ) : (
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">Video URL</label>
            <input
              type="url"
              required
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              placeholder="https://youtube.com/watch?v=..."
              className="w-full rounded-lg border border-gold/20 bg-navy px-4 py-2.5 text-white placeholder-gray-500 focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-colors"
            />
          </div>
        )}

        <button
          type="submit"
          disabled={status === "uploading" || (resourceType === "pdf" && !file)}
          className="rounded-lg bg-gold px-4 py-2.5 text-sm font-semibold text-navy tracking-wide uppercase hover:bg-gold-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === "uploading" ? "Uploading..." : "Upload Resource"}
        </button>
      </form>

      {resources.length > 0 && (
        <div>
          <h3 className="text-white text-sm font-medium mb-3">
            Existing Resources ({resources.length})
          </h3>
          <div className="space-y-2">
            {resources.map((r) => (
              <div
                key={r.id}
                className="flex items-center justify-between border border-gold/10 rounded-lg px-4 py-3 bg-navy-light"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded ${
                        r.resource_type === "pdf"
                          ? "bg-gold/10 text-gold"
                          : "bg-blue-900/30 text-blue-400"
                      }`}
                    >
                      {r.resource_type}
                    </span>
                    <p className="text-white text-sm">{r.title}</p>
                  </div>
                  {r.description && (
                    <p className="text-gray-500 text-xs mt-0.5">{r.description}</p>
                  )}
                </div>
                <DeleteButton
                  table="research_resources"
                  id={r.id}
                  filePath={r.file_path}
                  label={r.title}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ── Shared components ──

function ContentList({
  title,
  items,
  table,
}: {
  title: string;
  items: CourseMaterial[];
  table: string;
}) {
  return (
    <div>
      <h3 className="text-white text-sm font-medium mb-3">{title}</h3>
      <div className="space-y-2">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between border border-gold/10 rounded-lg px-4 py-3 bg-navy-light"
          >
            <div className="flex items-start gap-3">
              {item.module_number != null && (
                <span className="shrink-0 w-6 h-6 rounded-full bg-gold/10 text-gold text-xs font-semibold flex items-center justify-center mt-0.5">
                  {item.module_number}
                </span>
              )}
              <div>
                <p className="text-white text-sm">{item.title}</p>
                {item.description && (
                  <p className="text-gray-500 text-xs mt-0.5">{item.description}</p>
                )}
              </div>
            </div>
            <DeleteButton
              table={table}
              id={item.id}
              filePath={item.file_path}
              label={item.title}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function FileInput({
  file,
  onFileChange,
  accept,
}: {
  file: File | null;
  onFileChange: (f: File | null) => void;
  accept: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-1.5">File</label>
      <label className="flex items-center justify-center gap-2 w-full rounded-lg border border-dashed border-gold/30 bg-navy px-4 py-6 cursor-pointer hover:border-gold/50 transition-colors">
        <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
        </svg>
        <span className="text-sm text-gray-400">
          {file ? file.name : "Click to select a file"}
        </span>
        <input
          type="file"
          accept={accept}
          className="hidden"
          onChange={(e) => onFileChange(e.target.files?.[0] ?? null)}
        />
      </label>
    </div>
  );
}

function StatusMessage({
  status,
  message,
}: {
  status: "idle" | "uploading" | "done" | "error";
  message: string;
}) {
  if (status === "idle" || !message) return null;

  return (
    <div
      className={`text-sm rounded-lg px-4 py-3 ${
        status === "done"
          ? "bg-green-900/30 border border-green-700/50 text-green-300"
          : "bg-red-900/30 border border-red-700/50 text-red-300"
      }`}
    >
      {message}
    </div>
  );
}
