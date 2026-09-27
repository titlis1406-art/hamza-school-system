/**
 * نظام مدرسة ومسجد سيدنا أمير حمزة رضي الله عنه (تأسست 1891م)
 * ملف قاعدة البيانات الموحدة ومحرك الربط المركزي (app.js)
 */

// مفاتيح التخزين الموحدة
const DB_KEYS = {
    STUDENTS: 'hamza_students_db',
    TEACHERS: 'hamza_teachers_db',
    DONATIONS: 'hamza_donations_db',
    EXPENSES: 'hamza_mosque_expenses_db',
    STORE_LOGS: 'hamza_store_logs_db',
    CURRENT_LANG: 'hamza_sys_lang'
};

// ======================= 1. دوال إدارة الطلاب =======================

// جلب قائمة الطلاب
function getStudents() {
    let data = localStorage.getItem(DB_KEYS.STUDENTS);
    if (!data) {
        // بيانات تجريبية أولية تبدأ بها المدرسة
        const initialStudents = [
            {
                date: "2026-01-15",
                seatNo: "HM1891-01",
                name: "محمد أحمد الفكي",
                idNum: "812034958",
                age: "15 سنة",
                program: "حفظ",
                status: "مقيم",
                phone: "03001234567",
                halaqa: "حلقة أبي حنيفة",
                teacher: "الشيخ أحمد",
                academic: "نعم",
                lab: "نعم",
                hostel: "نعم"
            },
            {
                date: "2026-02-01",
                seatNo: "HM1891-02",
                name: "إبراهيم عثمان حمزة",
                idNum: "812034959",
                age: "14 سنة",
                program: "تسميع",
                status: "مقيم",
                phone: "03007654321",
                halaqa: "حلقة أبي حنيفة",
                teacher: "الشيخ أحمد",
                academic: "نعم",
                lab: "نعم",
                hostel: "نعم"
            }
        ];
        saveStudentsList(initialStudents);
        return initialStudents;
    }
    return JSON.parse(data);
}

// حفظ قائمة الطلاب كاملة
function saveStudentsList(students) {
    localStorage.setItem(DB_KEYS.STUDENTS, JSON.stringify(students));
}

// إضافة طالب جديد وتوليد رقم جلوسه تصاعدياً
function addStudentToDB(studentObj) {
    let students = getStudents();
    students.push(studentObj);
    saveStudentsList(students);
}

// الحصول على رقم الجلوس التالي التلقائي
function getNextSeatNumber() {
    let students = getStudents();
    let nextNum = students.length + 1;
    return "HM1891-" + (nextNum < 10 ? "0" + nextNum : nextNum);
}

// حذف طالب برقم الجلوس
function deleteStudentFromDB(seatNo) {
    let students = getStudents();
    students = students.filter(s => s.seatNo !== seatNo);
    saveStudentsList(students);
}

// ======================= 2. دوال المعلمين والكادر =======================

function getTeachers() {
    let data = localStorage.getItem(DB_KEYS.TEACHERS);
    if (!data) {
        const initialTeachers = [
            {
                name: "الشيخ أحمد",
                nid: "35202-1234567-1",
                speciality: "معلم قرآن كريم",
                phone: "0300-1234567",
                timeIn: "07:30",
                timeOut: "14:00",
                salary: "45000",
                status: "نشط بالدوام"
            }
        ];
        localStorage.setItem(DB_KEYS.TEACHERS, JSON.stringify(initialTeachers));
        return initialTeachers;
    }
    return JSON.parse(data);
}

function addTeacherToDB(teacherObj) {
    let teachers = getTeachers();
    teachers.push(teacherObj);
    localStorage.setItem(DB_KEYS.TEACHERS, JSON.stringify(teachers));
}

// ======================= 3. دوال التبرعات وسندات القبض =======================

function getDonations() {
    let data = localStorage.getItem(DB_KEYS.DONATIONS);
    if (!data) {
        const initialDonations = [
            {
                receipt: "REC-1891-101",
                donor: "السيد / فاعل خير",
                target: "مدرسة أمير حمزة رضي الله عنه",
                type: "نقدي",
                value: "50,000 Rs",
                amountNum: 50000,
                date: "2026-09-24"
            }
        ];
        localStorage.setItem(DB_KEYS.DONATIONS, JSON.stringify(initialDonations));
        return initialDonations;
    }
    return JSON.parse(data);
}

function addDonationToDB(donObj) {
    let donations = getDonations();
    donations.push(donObj);
    localStorage.setItem(DB_KEYS.DONATIONS, JSON.stringify(donations));
}

// ======================= 4. دوال مصروفات المسجد =======================

function getMosqueExpenses() {
    let data = localStorage.getItem(DB_KEYS.EXPENSES);
    if (!data) {
        const initialExpenses = [
            {
                name: "فاتورة كهرباء المسجد لشهر سبتمبر",
                cat: "فاتورة كهرباء",
                cost: 8500,
                pay: "حساب بنكي (Bank Transfer)",
                ben: "شركة الكهرباء المحلية",
                date: "2026-09-20"
            },
            {
                name: "إصلاح وصيانة دينامو المياه الرئيسي",
                cat: "صيانة دينامو المياه",
                cost: 10000,
                pay: "نقداً (Cash)",
                ben: "الفني / محمد رفيق",
                date: "2026-09-22"
            }
        ];
        localStorage.setItem(DB_KEYS.EXPENSES, JSON.stringify(initialExpenses));
        return initialExpenses;
    }
    return JSON.parse(data);
}

function addMosqueExpenseToDB(expObj) {
    let expenses = getMosqueExpenses();
    expenses.push(expObj);
    localStorage.setItem(DB_KEYS.EXPENSES, JSON.stringify(expenses));
}

// ======================= 5. دوال المستودعات وسجل العهد =======================

function getStoreLogs() {
    let data = localStorage.getItem(DB_KEYS.STORE_LOGS);
    if (!data) {
        const initialLogs = [
            {
                store: "مستودع المصاحف",
                target: "محمد أحمد الفكي (HM1891-01)",
                desc: "مصحف شريف معتمد",
                qty: "1 نسخة",
                date: "2026-09-24"
            }
        ];
        localStorage.setItem(DB_KEYS.STORE_LOGS, JSON.stringify(initialLogs));
        return initialLogs;
    }
    return JSON.parse(data);
}

function addStoreLogToDB(logObj) {
    let logs = getStoreLogs();
    logs.push(logObj);
    localStorage.setItem(DB_KEYS.STORE_LOGS, JSON.stringify(logs));
}

// ======================= 6. أدوات مساعدة مشتركة (تاريخ ولغة) =======================

// تعيين تاريخ اليوم تلقائياً
function autoSetDate() {
    let el = document.getElementById('currentDateText');
    if (el) {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const today = new Date();
        el.innerText = "📅 تاريخ اليوم: " + today.toLocaleDateString('ar-SA', options);
    }
}

// حفظ واسترجاع اللغة المختارة
function setSavedLanguage(lang) {
    localStorage.setItem(DB_KEYS.CURRENT_LANG, lang);
}

function getSavedLanguage() {
    return localStorage.getItem(DB_KEYS.CURRENT_LANG) || 'ar';
}