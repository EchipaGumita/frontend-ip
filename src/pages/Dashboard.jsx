// eslint-disable-next-line no-unused-vars
import React from 'react';
import '../Dashboard.css';
import Sidebar from '../components/Sidebar';

const Dashboard = () => {
  return (
    <div className="dashboard-container d-flex">
      <Sidebar />
      <main className="content container py-4">
        <section className="section university-info">
          <div className="header-bar mb-4">
            <h3 className="text-primary">Universitatea Ștefan cel Mare din Suceava</h3>
          </div>

          <div className="card shadow-sm border-0">
            <div className="card-body">
              <p className="card-text">
                Universitatea Ştefan cel Mare din Suceava (USV), prin cele trei funcţii fundamentale 
                (cercetare, predare/învăţare şi servicii pentru comunitate desfăşurate în condiţii de autonomie instituţională 
                şi de libertate academică), contribuie în mod activ şi explicit la procesele de inovare şi dezvoltare socială.
              </p>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <strong>Misiuni principale:</strong>
                  <ul>
                    <li>Formarea specialiştilor cu pregătire superioară în diverse domenii.</li>
                    <li>Modelarea armonioasă a personalităţii studenţilor.</li>
                    <li>Dezvoltarea continuă a cercetării ştiinţifice la standarde internaţionale.</li>
                  </ul>
                </li>
                <li className="list-group-item">
                  <strong>Obiective prioritare:</strong>
                  <ul>
                    <li>Organizarea predării şi însuşirii cunoştinţelor pentru formarea specialiştilor.</li>
                    <li>Asigurarea şi dezvoltarea bazei materiale corespunzătoare activităţilor academice.</li>
                    <li>Promovarea relaţiilor de cooperare internaţională.</li>
                  </ul>
                </li>
              </ul>
              <p className="mt-3">
                Universitatea Ştefan cel Mare din Suceava este un spaţiu al învăţării, predării şi al proceselor cognitive,
                un areal al producţiei ştiinţifice, culturale, artistice şi sportive, şi un pilon de referinţă al abordării 
                integrative: triunghiul universitate, administraţie publică şi comunitatea economică şi socială.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
