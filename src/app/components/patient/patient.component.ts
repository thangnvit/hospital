import { Component, OnInit, Renderer } from '@angular/core';
import {HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';




@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {
  displayedColumns: string[] = [
    'er',
    'telephone',
    'status',
    'institution_name',
    'id',
    'ptname',
    'sex',
    'age',
    'patient_birth_dttm',
    'bodyparts',
    'seriescnt',
    'instcnt',
    'modalities',
    'datetime',
    'accessno',
    'desc',
    'ref_physician',
    'stationname'
  ];
  urlImgClicked = '';
  getImageApi = 'http://pportal-demo.herokuapp.com/users/getImage';
  patientInfoApi = 'http://pportal-demo.herokuapp.com/users/me';
  httpOptions = null;
  patientInfo = null;
  patientImg = [];
  dataTable = [];
  constructor(private router: Router, private http: HttpClient, private renderer: Renderer) { }

  ngOnInit() {
    const token = this.getToken();
    this.setHeader(token);
    this.getMe().subscribe(data => {
      this.patientInfo = this.getData(data);
      this.dataTable = this.getDataTable(this.patientInfo);
      this.bindingImage(this.patientInfo);
    }, err => {
      alert(err.error.message);
      this.router.navigate(['./login']);
    });

  }

  showFullImageClicked(event) {
    this.urlImgClicked = event.target.src;
  }

  getImage(studyuid, seriesuid, sopuid) {
    let params = new HttpParams();
    if (studyuid) { params = params.append('studyuid', studyuid); }
    if (seriesuid) { params = params.append('seriesuid', seriesuid); }
    if (sopuid) {params =  params.append('sopuid', sopuid); }
    return this.http.post(this.getImageApi, params, this.httpOptions);
  }

  getMe() {
      return this.http.get(this.patientInfoApi, this.httpOptions);
  }

  getStudyUid(patientInfo) {
    return patientInfo.studyserieslist[0].uid;
  }

  getSeriesUid(patientInfo) {
    return patientInfo.studyserieslist[0].serieslist[0].uid;
  }

  getImageList(patientInfo) {
    return patientInfo.studyserieslist[0].serieslist[0].imagelist;
  }

  getData(data) {
    if (!data.status) {
      return null;
    }
    return data.data;
  }
  bindingImage(patientInfo) {
    const images = this.getImageList(patientInfo);
    const seriesUid = this.getSeriesUid(patientInfo);
    const studyUid = this.getStudyUid(patientInfo);
    images.forEach(img => {
      this.getImage(studyUid, seriesUid, img.uid).subscribe(data => {
        const link = this.getData(data);
        this.patientImg.push(link);
        if (!this.urlImgClicked) {
          this.urlImgClicked = 'data:image/jpeg;base64,' + link;
        }
      }, err => {
      });
    });
  }

  getDataTable(patientInfo) {
    return patientInfo.studylist;
  }
  getToken() {
    return localStorage.getItem('token');
  }

  setHeader(token) {
    token = this.getToken();
    if (!token) {
      this.router.navigate(['./login']);
    }
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/x-www-form-urlencoded',
        // tslint:disable-next-line:max-line-length
        Authorization: 'Bearer ' + token
      })
    };
  }
}
