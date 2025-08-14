import { empgeneralDto } from "./empgeneral.dto";
import { apsaldetailDto } from "./saldetail.dto";
export class  empmasterDto{

                coCode: string | null;
               
                dvCode: string | null;
               
                brCode: string | null;
               
                empCode: string | null;
               
                oldEmpcode: string | null;
               
                empName: string | null;
               
                empAcName: string | null;
               
                desigCode: string | null;
               
                deptCode: string  | null;
               
                countryCode: string;
               
                nationalYn: boolean;
               
                empCat: string;
               
                empStatus: string;
               
                empGender: string;
               
                familyStatus: string  | null;
               
                martialStatus: string  | null;
               
                joinDate: Date;
               
                dob: Date;
               
                fatherName: string;
               
                motherName: string;
               
                placeOfBirth: string;
               
                spouseName: string;
               
                children: number;
               
                otYn: string;
               
                defJob: string;
               
                transportMode: string;
               
                vehType: string;
               
                vehNo: string;
               
                vehModel: string;
               
                vehColor: string;
               
                vehEngine: string;
               
                vehChasis: string;
               
                accomadationType: string;
               
                campFlat: string;
               
                agrmNo: string;
               
                landlord: string;
               
                offTel: string;
               
                extn: string;
               
                aBldNo: string;
               
                aFlatNo: string;
               
                aAddress: string;
               
                aResTelno: string;
               
                aMobileNo: string;
               
                aEmail: string;
               
                aFaxNo: string;
               
                campBldNo: string;
               
                campRoomNo: string;
               
                campCotNo: string;
               
                campTelNo: string;
               
                telNoHomecountry: string;
               
                permenantAdd1: string;
               
                permenantAdd2: string;
               
                permenantAdd3: string;
               
                permenantAdd4: string;
               
                endOfService: Date;
               
                lastLeave: Date;
               
                nextLeaveEligibility: number;
               
                airDestination: string;
               
                pictuePath: string;
               
                joinDesig: string;
               
                laborCardDesig: string;
               
                joinSalary: number;
               
                socSecYn: string;
               
                lastIncrDate: Date;
               
                bankBr: string;
               
                empGrade: string;
               
                ticketEligibility: string;
               
                ticketFrequency: string;
               
                vacationDays: string;
               
                mediAcalYn: string;
               
                medicalFor: string;
               
                familyName: string;
               
                birthPlace: string;
               
                religion: string;
               
                eduQuali: string;
               
                experience: string;
               
                spkLang1: string;
               
                spkLang2: string;
               
                spkLang3: string;
               
                spkLang4: string;
               
                spkLang5: string;
               
                lastEntryDate: Date;
               
                lastEntryPort: string;
               
                salToBank: string;
               
                bankAccno: string;
               
                bank: string;
               
                isJob: string | null="";
               
                otRate: Date;
               
                hourlyRate: Date;
               
                skillLevel: string| null="";
               
                contractStDt: Date;
               
                socInsNo: string | null="";
               
                labClrNo: string;
               
                visaCompany: string;
               
                paymentAfter: number;
               
                salCat: string | null="";
               
                bloodGroup: string;
               
                visaType: string | null="";
               
                singleManager: string;
               
                managerCode: string;
               
                remarks: string;
               
                airfare: number;
               
                inclForPyr: string;
               
                gratuityPdTill: Date;
               
                lvSalTo: Date;
               
                ticketTill: Date;
               
                firstLeaveLeaveSal: string;
               
                firstYearLeaveSal: string;
               
                bankLetterYn: string;
               
                bankLetterRem: string;
               
                emailPayslip: string;
               
                cumAnnlvOp: number;
               
                annlvMonthly: number;
               
                salType: string | null="";
               
                approvalType: string | null="";
               
                aprlManagerCode: string;
               
                sysuser: string;
               
                systemdate: Date;
               
                modiuser: string;
               
                modidate: Date;
               
                salPost: string | null="";
               
                empBr: string | null="";
               
                lvConsumed: number;
               
                lvOpenDate: Date;
            
                empgeneral?:empgeneralDto[];

                apsaldetailDto?:apsaldetailDto[];

}