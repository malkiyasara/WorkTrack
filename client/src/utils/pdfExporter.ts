import Alert from "./alert";

const getRangeLabel = (range) => {
  switch (range) {
    case "5": return "Last 5 Days";
    case "7": return "Last 7 Days";
    case "30": return "Last 30 Days";
    case "90": return "Last 90 Days";
    default: return "All Time";
  }
};

const formatDate = (dateString) => {
  if (!dateString) return "No specific deadline";
  return new Date(dateString).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric"
  });
};

export const exportPDFReport = async ({
  filteredTasks,
  dateRange,
  userName,
  totalCount,
  completedCount,
  productivity,
  accuracy
}) => {
  if (!filteredTasks || filteredTasks.length === 0) {
    Alert.error("Export Cancelled", "No data records found matching your selected timeframe.");
    return;
  }

  try {
    const taskTableRowsHtml = filteredTasks.map((task, idx) => `
      <tr style="border-bottom: 1px solid #e2e8f0;">
        <td style="padding: 10px; font-size: 11px; color: #475569;">${idx + 1}</td>
        <td style="padding: 10px; font-size: 11px; font-weight: 600; color: #0f172a;">${task.title || "Untitled"}</td>
        <td style="padding: 10px; font-size: 11px;">
          <span style="padding: 4px 8px; border-radius: 6px; font-size: 10px; font-weight: 700; ${
            task.status?.toLowerCase() === "completed"
              ? "background: #d1fae5; color: #065f46;"
              : "background: #fef3c7; color: #92400e;"
          }">${task.status || "Pending"}</span>
        </td>
        <td style="padding: 10px; font-size: 11px; font-weight: bold; color: #334155;">${task.priority || "Low"}</td>
        <td style="padding: 10px; font-size: 11px; color: #64748b;">${formatDate(task.createdAt)}</td>
        <td style="padding: 10px; font-size: 11px; color: #64748b;">${task.status?.toLowerCase() === "completed" ? formatDate(task.updatedAt) : "Incomplete"}</td>
        <td style="padding: 10px; font-size: 11px; color: #475569; font-weight: 500;">${formatDate(task.dueDate)}</td>
      </tr>
    `).join("");

    const reportWrapper = document.createElement("div");
    reportWrapper.innerHTML = `
      <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; padding: 30px; color: #0f172a; background: #ffffff;">
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #f1f5f9; padding-bottom: 20px; margin-bottom: 25px;">
          <div>
            <div style="font-size: 22px; font-weight: 800; color: #0f172a; letter-spacing: -0.5px;">WorkTrack Analytics</div>
            <p style="margin: 4px 0 0 0; font-size: 12px; color: #64748b;">
              Time Range: <strong>${getRangeLabel(dateRange)}</strong> &bull; Prepared for ${userName || "Workspace Rep"}
            </p>
          </div>
          <div style="text-align: right;">
            <span style="font-size: 10px; font-weight: 700; color: #6b21a8; background: #f3e8ff; padding: 4px 10px; border-radius: 20px; text-transform: uppercase;">System Audit Record</span>
            <p style="margin: 6px 0 0 0; font-size: 11px; color: #94a3b8;">Exported: ${new Date().toLocaleDateString()}</p>
          </div>
        </div>

        <div style="display: flex; gap: 12px; margin-bottom: 30px;">
          <div style="flex: 1; background: #f8fafc; border: 1px solid #e2e8f0; padding: 15px; border-radius: 12px;">
            <div style="font-size: 10px; text-transform: uppercase; color: #64748b; font-weight: 700;">Total Handled</div>
            <div style="font-size: 20px; font-weight: 800; color: #0f172a; margin-top: 4px;">${totalCount}</div>
          </div>
          <div style="flex: 1; background: #f8fafc; border: 1px solid #e2e8f0; padding: 15px; border-radius: 12px;">
            <div style="font-size: 10px; text-transform: uppercase; color: #64748b; font-weight: 700;">Completed</div>
            <div style="font-size: 20px; font-weight: 800; color: #0f172a; margin-top: 4px;">${completedCount}</div>
          </div>
          <div style="flex: 1; background: #f8fafc; border: 1px solid #e2e8f0; padding: 15px; border-radius: 12px;">
            <div style="font-size: 10px; text-transform: uppercase; color: #64748b; font-weight: 700;">Productivity</div>
            <div style="font-size: 20px; font-weight: 800; color: #0f172a; margin-top: 4px;">${productivity}%</div>
          </div>
          <div style="flex: 1; background: #faf5ff; border: 1px solid #d8b4fe; padding: 15px; border-radius: 12px;">
            <div style="font-size: 10px; text-transform: uppercase; color: #6b21a8; font-weight: 700;">Accuracy</div>
            <div style="font-size: 20px; font-weight: 800; color: #6b21a8; margin-top: 4px;">${accuracy}%</div>
          </div>
        </div>

        <h2 style="font-size: 14px; font-weight: 700; margin: 0 0 12px 0; color: #0f172a; border-left: 3px solid #6b21a8; padding-left: 8px;">
          Comprehensive Task Ledger Records
        </h2>
        <table style="width: 100%; border-collapse: collapse; text-align: left;">
          <thead>
            <tr style="background: #f1f5f9;">
              <th style="padding: 10px; font-size: 11px; font-weight: 700; color: #475569; text-transform: uppercase;">#</th>
              <th style="padding: 10px; font-size: 11px; font-weight: 700; color: #475569; text-transform: uppercase;">Task Title</th>
              <th style="padding: 10px; font-size: 11px; font-weight: 700; color: #475569; text-transform: uppercase;">Status</th>
              <th style="padding: 10px; font-size: 11px; font-weight: 700; color: #475569; text-transform: uppercase;">Priority</th>
              <th style="padding: 10px; font-size: 11px; font-weight: 700; color: #475569; text-transform: uppercase;">Date Added</th>
              <th style="padding: 10px; font-size: 11px; font-weight: 700; color: #475569; text-transform: uppercase;">Completed</th>
              <th style="padding: 10px; font-size: 11px; font-weight: 700; color: #475569; text-transform: uppercase;">Due Date</th>
            </tr>
          </thead>
          <tbody>
            ${taskTableRowsHtml}
          </tbody>
        </table>
      </div>
    `;

    const html2pdf = (await import("html2pdf.js")).default;

    const exportOptions = {
      margin: [10, 10, 10, 10] as [number, number, number, number],
      filename: `Workspace_Report_Last_${dateRange}_Days.pdf`,
      image: { type: "jpeg" as const, quality: 0.98 },
      html2canvas: { scale: 2, logging: false, useCORS: true },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" }
    };

    html2pdf().set(exportOptions as any).from(reportWrapper).save();
    Alert.toastSuccess("PDF downloaded successfully.");
  } catch (e) {
    console.error("PDF generation pipeline error:", e);
    Alert.error("Export Failed", "Could not generate PDF download file cleanly.");
  }
};