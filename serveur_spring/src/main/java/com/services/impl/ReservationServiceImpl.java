package com.services.impl;

import com.dtos.ReservationDto;
import com.dtos.ResultatDto;
import com.entities.Commande;
import com.entities.Monoption;
import com.entities.Reservation;
import com.repositories.CommandeRepository;
import com.repositories.OptionRepository;
import com.repositories.ReservationRepository;
import com.repositories.SortieRepository;
import com.services.ReservationService;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Set;

@Service("reservationService")
public class ReservationServiceImpl implements ReservationService {

    private final ReservationRepository reservationRepository;
    private final CommandeRepository commandeRepository;
    private final OptionRepository optionRepository;
    private final SortieRepository sortieRepository;

    public ReservationServiceImpl(ReservationRepository reservationRepository, CommandeRepository commandeRepository, OptionRepository optionRepository, SortieRepository sortieRepository) {
        this.reservationRepository = reservationRepository;
        this.commandeRepository = commandeRepository;
        this.optionRepository = optionRepository;
        this.sortieRepository = sortieRepository;
    }

    @Override
    public ResultatDto saveReservation(ReservationDto reservationDto) {
        ReservationDto reservationDtoRetourne = null;
        ResultatDto res = new ResultatDto();

        // Vérification de l'unicité de l'id
        try {
            Reservation reservation =  this.reservationRepository.findById(reservationDto.getIdReservation()).orElseThrow(() -> new EntityNotFoundException("Reservation not found"));
            //Ecriture de la réponse
            res.setOk(false);
            res.setMessage("L'identifiant de la réservation est déjà pris.");
        } catch (EntityNotFoundException e) {
            boolean erreur = false;

            // Vérification que la commande n'est pas null
            if (reservationDto.getIdCommande() == 0 || reservationDto.getIdSortie() == 0 || reservationDto.getNbPersonnes()==0){
                //Ecriture de la réponse
                res.setOk(false);
                res.setMessage("La commande, la soirée et/ou le nombre de personne ne sont pas définis.");
                erreur = true;
            }

            // Aucune erreur enregistrement de la reservation
            if (!erreur) {
                //Vérification que la commande et la soirée existent
                try{
                    Reservation r = this.reservationDtoToEntity(reservationDto);
                    r = this.reservationRepository.save(r);
                    //Ajout de la réservations dans la liste des reservations de toutes les options demandées
                    Iterator<Monoption> it = r.getOptionSet().iterator();
                    while (it.hasNext()){
                        Monoption o = it.next();
                        if(o.getReservationSet() == null){
                            o.setReservationSet(new HashSet<>());
                        }
                        o.getReservationSet().add(r);
                        this.optionRepository.save(o);
                    }
                    reservationDtoRetourne= this.reservationEntityToDto(r);
                    //Ecriture de la réponse
                    res.setOk(true);
                    res.setMessage("Reservation ajouté");
                    Set<Object> set = new HashSet<>();
                    set.add(reservationDtoRetourne);
                    res.setData(set);
                }catch (EntityNotFoundException err){
                    //Ecriture de la réponse
                    res.setOk(false);
                    res.setMessage("La commande, la soirée ou les options définis n'existent pas.");
                }
            }
        }
        return res;
    }

    @Override
    public ResultatDto getReservationById(int reservationId) {
        ResultatDto res = new ResultatDto();
        //Vérification de l'existence de la réservation
        try{
            Reservation reservation =  this.reservationRepository.findById(reservationId).orElseThrow(() -> new EntityNotFoundException("Reservation not found"));
            //Ecriture de la réponse
            res.setOk(true);
            res.setMessage("Reservation existante");
            Set<Object> set = new HashSet<>();
            set.add(this.reservationEntityToDto(reservation));
            res.setData(set);
        }catch(EntityNotFoundException e){
            //Ecriture de la réponse
            res.setOk(false);
            res.setMessage("Reservation inexistante");
        }
        return res;
    }

    @Override
    public ResultatDto updateReservationById(int reservationId, ReservationDto reservationDto) {
        ResultatDto res = new ResultatDto();
        //Vérification de l'existence de la réservation
        try{
            Reservation reservation = this.reservationRepository.findById(reservationId).orElseThrow(() -> new EntityNotFoundException("Reservation not found"));
            boolean erreur = false;
            //Vérification de la date de la commande de la réservation
            if(reservation.getIdCommande().getDateCommande()!=null){
                erreur =true;
                //Ecriture de la réponse
                res.setOk(false);
                res.setMessage("La commande étant déjà passée vous ne pouvez pas modifier la reservation.");
            }
            if(!erreur){
                //Modification du nombre de personnes de la réservation
                if(reservationDto.getNbPersonnes()!=0){
                    reservation.setNbPersonnes(reservationDto.getNbPersonnes());
                }
                //Modification des options de la réservation
                if(reservationDto.getIdOptions()!=null){
                    Iterator<Monoption> it = reservation.getOptionSet().iterator();
                    while(it.hasNext()){
                        Monoption o = it.next();
                        boolean trouve = false;
                        Iterator<Integer> it2 = reservationDto.getIdOptions().iterator();
                        while (it2.hasNext()){
                            int id = it2.next();
                            if(o.getIdOption()==id){
                                trouve = true;
                                it2.remove();
                            }
                        }
                        if(!trouve){
                            it.remove();
                            this.optionRepository.delete(o);
                        }
                    }
                    Iterator<Integer> it2 = reservationDto.getIdOptions().iterator();
                    while (it2.hasNext()){
                        int id = it2.next();
                        try{
                            Monoption o = this.optionRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Option not found"));
                           if(o.getReservationSet().size()==0){
                               o.setReservationSet(new HashSet<>());
                           }
                           o.getReservationSet().add(reservation);
                           this.optionRepository.save(o);
                            if(reservation.getOptionSet().size()==0){
                                reservation.setOptionSet(new HashSet<>());
                            }
                            reservation.getOptionSet().add(o);
                        }catch(EntityNotFoundException e){
                            res.setMessage("Une des options demandé n'existe pas.");
                            res.setOk(false);
                        }
                    }
                }
                //Enregistrement des modification de la réservation
                this.reservationRepository.save(reservation);
                //Ecriture de la réponse
                res.setOk(true);
                res.setMessage("Réservation modifier.");
                Set<Object> set = new HashSet<>();
                set.add(this.reservationEntityToDto(reservation));
                res.setData(set);
            }
        }catch (EntityNotFoundException e){
            //Ecriture de la réponse
            res.setMessage("La réservation n'existe pas.");
            res.setOk(false);
        }
        return res;
    }

    @Override
    public ResultatDto deleteReservation(int reservationId) {
        ResultatDto res = new ResultatDto();
        //Vérification de l'existence de la réservation
        try{
            Reservation reservation = reservationRepository.findById(reservationId).orElseThrow(() -> new EntityNotFoundException("Reservation not found"));
            //Suppression de la réservation dans la liste des réservations des options
            Iterator<Monoption> it = reservation.getOptionSet().iterator();
            while (it.hasNext()){
                Monoption o = it.next();
                o.getReservationSet().remove(reservation);
                this.optionRepository.save(o);
            }
            //Décrémentation du nombre d'inscrit à une sortie si la commande est passée.
            if(reservation.getIdCommande().getDateCommande()!=null){
                int newNbInscrit = reservation.getIdSortie().getNbInscrits()-reservation.getNbPersonnes();
                reservation.getIdSortie().setNbInscrits(newNbInscrit);
                this.sortieRepository.save(reservation.getIdSortie());
            }
            //Suppression de la réservation
            this.reservationRepository.deleteById(reservationId);
            //Ecriture de la réponse
            res.setOk(true);
            res.setMessage("Suppression réussi.");
        }catch (EntityNotFoundException e){
            //Ecriture de la réponse
            res.setOk(false);
            res.setMessage("Reservation inexistant.");
        }
        return res;
    }

    @Override
    public ResultatDto getAllReservation() {
        ResultatDto res = new ResultatDto();
        Set<Object> reservationDto = new HashSet<>();
        List<Reservation> reservations = this.reservationRepository.findAll();
        reservations.forEach(reservation -> {
            reservationDto.add(reservationEntityToDto(reservation));
        });
        //Ecriture de la réponse
        res.setOk(true);
        res.setMessage("Liste de toutes les reservations.");
        res.setData(reservationDto);
        return res;
    }

    @Override
    public ResultatDto getReservetionByIdCommande(int id) {
        ResultatDto res = new ResultatDto();
        //Vérification de l'existence de la réservation
        try {
            Commande c = this.commandeRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Commande not found"));
            Set<Object> reservationDto = new HashSet<>();
            List<Reservation> reservations = this.reservationRepository.findAll();
            reservations.forEach(reservation -> {
                //Récupération de toutes les réservations d'une commande
                if(reservation.getIdCommande().equals(c)) {
                    reservationDto.add(reservationEntityToDto(reservation));
                }
            });
            //Ecriture de la réponse
            res.setOk(true);
            res.setMessage("Liste de toutes les reservations de la commande"+id+".");
            res.setData(reservationDto);
        }catch (EntityNotFoundException e){
            //Ecriture de la réponse
            res.setOk(false);
            res.setMessage("Commande inexistante.");
        }
        return res;
    }

    private ReservationDto reservationEntityToDto(Reservation reservation) {
        ReservationDto reservationDto = new ReservationDto();
        reservationDto.setIdReservation(reservation.getIdReservation());
        reservationDto.setIdCommande(reservation.getIdCommande().getIdCommande());
        reservationDto.setIdSortie(reservation.getIdSortie().getIdSortie());
        reservationDto.setNbPersonnes(reservation.getNbPersonnes());
        Set<Integer> set = new HashSet<>();
        Iterator<Monoption> it = reservation.getOptionSet().iterator();
        while(it.hasNext()){
            Monoption option = it.next();
            set.add(option.getIdOption());
        }
        reservationDto.setIdOptions(set);
        return reservationDto;
    }

    private Reservation reservationDtoToEntity(ReservationDto reservationDto) {
        Reservation reservation = new Reservation();
        reservation.setIdReservation(reservationDto.getIdReservation());
        reservation.setIdCommande(this.commandeRepository.findById(reservationDto.getIdCommande()).orElseThrow(() -> new EntityNotFoundException("Commande not found")));
        reservation.setIdSortie(this.sortieRepository.findById(reservationDto.getIdSortie()).orElseThrow(() -> new EntityNotFoundException("Soiree not found")));
        reservation.setNbPersonnes(reservationDto.getNbPersonnes());
        Set<Monoption> set = new HashSet<>();
        Iterator<Integer> it = reservationDto.getIdOptions().iterator();
        while(it.hasNext()){
            int id = it.next();
            set.add(this.optionRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Option not found")));
        }
        reservation.setOptionSet(set);
        return reservation;
    }
}
